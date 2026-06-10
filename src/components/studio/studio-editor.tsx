"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { BlurImage } from "../ui/blur-image";
import { 
  UploadCloud, 
  Sparkles, 
  Download, 
  RefreshCw, 
  Check, 
  Image as ImageIcon,
  ArrowRight,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

// Static ESM imports of precollected mandalas
import mandala1 from "@/assets/Img/mandalas/mandala-1.png";
import mandala2 from "@/assets/Img/mandalas/mandala-2.png";
import mandala3 from "@/assets/Img/mandalas/mandala-3.png";
import mandala4 from "@/assets/Img/mandalas/mandala-4.jpg";

interface StudioEditorProps {
  dict: any;
  lang: string;
}

interface MandalaOption {
  id: string;
  name: string;
  src: any;
}

// Canvas utility to blend wall image and mandala art
const blendWallAndMandala = (
  wallBase64: string,
  mandalaBase64: string,
  isCustom: boolean
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const wallImg = new window.Image();
    const mandalaImg = new window.Image();
    let loadedCount = 0;

    const onLoad = () => {
      loadedCount++;
      if (loadedCount === 2) {
        try {
          const canvas = document.createElement("canvas");
          const maxDim = 2000;
          let width = wallImg.width;
          let height = wallImg.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Could not get 2D canvas context"));
            return;
          }

          // 1. Draw original wall
          ctx.drawImage(wallImg, 0, 0, width, height);

          // 2. Calculate centered square coordinates
          // Mandala size will be 55% of the smaller dimension of the wall
          const size = Math.min(width, height) * 0.55;
          const x = (width - size) / 2;
          const y = (height - size) / 2;
          const cx = x + size / 2;
          const cy = y + size / 2;
          const r = size / 2;

          // 3. Save state and set realistic paint texture opacity
          ctx.save();
          ctx.globalAlpha = 0.85;

          // 4. Create a clean circular clipping mask to force-eliminate any square frames or backgrounds
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.clip();

          // 5. Multiply blend for custom solid-background uploads, source-over for transparent precollected PNG vectors
          ctx.globalCompositeOperation = isCustom ? "multiply" : "source-over";

          // 6. Draw the mandala inside the circular mask
          ctx.drawImage(mandalaImg, x, y, size, size);

          // 7. Restore the context state to remove the clipping mask
          ctx.restore();

          // 8. Draw an elegant, thin, hand-painted circular border around the mandala
          ctx.save();
          ctx.globalAlpha = 0.5;
          ctx.strokeStyle = isCustom ? "rgba(100, 100, 100, 0.3)" : "rgba(180, 140, 60, 0.4)";
          ctx.lineWidth = Math.max(1.5, size * 0.005);
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();

          resolve(canvas.toDataURL("image/jpeg", 0.92));
        } catch (err) {
          reject(err);
        }
      }
    };

    wallImg.onload = onLoad;
    mandalaImg.onload = onLoad;
    wallImg.onerror = () => reject(new Error("Failed to load wall image"));
    mandalaImg.onerror = () => reject(new Error("Failed to load mandala image"));

    wallImg.src = wallBase64;
    mandalaImg.src = mandalaBase64;
  });
};

export default function StudioEditor({ dict, lang }: StudioEditorProps) {
  const t = dict?.studioEditor || {};
  
  // Pre-collected mandalas definition
  const PRECOLLECTED_MANDALAS: MandalaOption[] = [
    { id: "mandala-1", name: lang === "es" ? "Alineación de Loto" : "Lotus Alignment", src: mandala1 },
    { id: "mandala-2", name: lang === "es" ? "Círculo Samsara" : "Samsara Circle", src: mandala2 },
    { id: "mandala-3", name: lang === "es" ? "Fusión Vectorial" : "Vectorial Fusion", src: mandala3 },
    { id: "mandala-4", name: lang === "es" ? "Fusión Vectorial" : "Vectorial Fusion", src: mandala4 },
  ];

  // States
  const [wallImage, setWallImage] = useState<string | null>(null);
  const [selectedMandalaId, setSelectedMandalaId] = useState<string | null>(null);
  const [customMandalaImage, setCustomMandalaImage] = useState<string | null>(null);
  
  const [generating, setGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<string | null>(null);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);

  // File input refs
  const wallInputRef = useRef<HTMLInputElement>(null);
  const customMandalaInputRef = useRef<HTMLInputElement>(null);

  // Loading steps text
  const loadingSteps = [
    t.loadingSteps?.analyzing || "Analyzing wall lighting & texture...",
    t.loadingSteps?.parsing || "Evaluating mandala geometry & patterns...",
    t.loadingSteps?.synthesis || "Synthesizing descriptive design prompt...",
    t.loadingSteps?.generating || "Painting your wall with Spatial AI..."
  ];

  // Cycle through loading steps during generation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (generating) {
      setLoadingStepIndex(0);
      interval = setInterval(() => {
        setLoadingStepIndex((prev) => {
          if (prev < loadingSteps.length - 1) return prev + 1;
          return prev; // hold on the last step until done
        });
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [generating]);

  // Helper: Convert file to Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Helper: Fetch local asset and convert to Base64
  const assetToBase64 = async (assetSrc: string): Promise<string> => {
    const response = await fetch(assetSrc);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handlers
  const handleWallUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error(lang === "es" ? "Por favor selecciona un archivo de imagen válido." : "Please select a valid image file.");
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      setWallImage(base64);
      toast.success(lang === "es" ? "Imagen de pared cargada correctamente." : "Wall photo uploaded successfully.");
    } catch (err) {
      console.error(err);
      toast.error(lang === "es" ? "Error al procesar la imagen." : "Error processing image.");
    }
  };

  const handleCustomMandalaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error(lang === "es" ? "Por favor selecciona un archivo de imagen válido." : "Please select a valid image file.");
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      setCustomMandalaImage(base64);
      setSelectedMandalaId("custom");
      toast.success(lang === "es" ? "Referencia cargada." : "Reference mandala uploaded.");
    } catch (err) {
      console.error(err);
      toast.error(lang === "es" ? "Error al procesar el mandala." : "Error processing mandala.");
    }
  };

  const handleSelectMandala = (id: string) => {
    setSelectedMandalaId(id);
    setCustomMandalaImage(null); // Clear custom reference if preloaded is selected
  };

  const handleGenerate = async () => {
    if (!wallImage) {
      toast.error(t.errors?.missingWall || "Please upload a wall image first.");
      return;
    }

    if (!selectedMandalaId) {
      toast.error(t.errors?.missingMandala || "Please select a mandala or upload a custom reference.");
      return;
    }

    setGenerating(true);
    setGeneratedResult(null);

    try {
      let finalMandalaBase64 = "";

      if (selectedMandalaId === "custom" && customMandalaImage) {
        finalMandalaBase64 = customMandalaImage;
      } else {
        const selectedOption = PRECOLLECTED_MANDALAS.find(opt => opt.id === selectedMandalaId);
        if (selectedOption) {
          // Resolve static ESM import URL
          const resolvedSrc = selectedOption.src.src || selectedOption.src;
          finalMandalaBase64 = await assetToBase64(resolvedSrc);
        }
      }

      if (!finalMandalaBase64) {
        throw new Error("Could not load mandala reference image.");
      }

      const response = await fetch("/api/studio/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallImage,
          mandalaImage: finalMandalaBase64,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Generation request failed.");
      }

      if (data.fallback) {
        console.log("Stage 2 API fallback: Rendering client-side Canvas blend...");
        const blendedImage = await blendWallAndMandala(
          wallImage,
          finalMandalaBase64,
          selectedMandalaId === "custom"
        );
        setGeneratedResult(blendedImage);
        toast.success(
          lang === "es"
            ? "¡Mural compuesto con éxito usando el análisis espacial!"
            : "Mural composited successfully using spatial analysis!"
        );
      } else {
        setGeneratedResult(data.image);
        toast.success(lang === "es" ? "¡Mural renderizado con éxito!" : "Mural rendered successfully!");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || (lang === "es" ? "Error de generación de IA" : "AI Generation failed"));
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedResult) return;
    const link = document.createElement("a");
    link.href = generatedResult;
    link.download = `accent-wall-agency-mural-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setGeneratedResult(null);
    setWallImage(null);
    setSelectedMandalaId(null);
    setCustomMandalaImage(null);
  };

  return (
    <div className="w-full min-h-screen bg-[#080808] text-white flex flex-col items-center py-20 px-4 md:px-8 font-sans">
      <div className="max-w-6xl w-full flex flex-col items-center gap-12">
        
        {/* Elegant Luxury Header */}
        <div className="text-center flex flex-col items-center gap-3 max-w-2xl mt-8">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[0.65rem] tracking-[0.3em] text-primary uppercase font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600"
          >
            {t.subtitle}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400"
          >
            {t.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base text-neutral-400 leading-relaxed mt-2"
          >
            {t.description}
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {!generatedResult && !generating ? (
            <motion.div
              key="editor-setup"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
            >
              
              {/* Card 1: Wall Image Upload */}
              <div className="relative group rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl p-6 sm:p-8 flex flex-col gap-6 transition-all duration-500 hover:border-primary/20 hover:bg-white/[0.03]">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
                
                <h3 className="text-lg font-semibold tracking-wide text-neutral-200 flex items-center gap-2">
                  <span className="size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs border border-primary/20 font-bold">1</span>
                  {t.uploadWall}
                </h3>

                <input
                  type="file"
                  ref={wallInputRef}
                  onChange={handleWallUpload}
                  accept="image/*"
                  className="hidden"
                />

                {wallImage ? (
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/10 group/preview flex items-center justify-center bg-black">
                    <img
                      src={wallImage}
                      alt="Uploaded Wall"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/preview:scale-105"
                    />
                    <button
                      onClick={() => setWallImage(null)}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center gap-2 cursor-pointer text-xs font-semibold uppercase tracking-wider text-red-400"
                    >
                      <RefreshCw className="size-4 animate-spin" style={{ animationDuration: '4s' }} />
                      {lang === "es" ? "Cambiar Imagen" : "Change Image"}
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => wallInputRef.current?.click()}
                    className="w-full aspect-[4/3] rounded-xl border border-dashed border-white/10 hover:border-primary/40 bg-white/[0.01] hover:bg-primary/[0.02] flex flex-col items-center justify-center gap-4 transition-all duration-300 cursor-pointer group/uploader"
                  >
                    <div className="p-4 rounded-full bg-white/[0.03] group-hover/uploader:bg-primary/10 border border-white/5 group-hover/uploader:border-primary/20 text-neutral-400 group-hover/uploader:text-primary transition-all duration-300">
                      <UploadCloud className="size-8" />
                    </div>
                    <div className="text-center px-4">
                      <p className="text-sm font-medium text-neutral-300 group-hover/uploader:text-white transition-colors">
                        {lang === "es" ? "Subir foto de pared" : "Upload wall photo"}
                      </p>
                      <p className="text-xs text-neutral-500 mt-1 max-w-[240px] leading-relaxed">
                        {t.uploadWallDescription}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Card 2: Mandala / Reference Selection */}
              <div className="relative group rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl p-6 sm:p-8 flex flex-col gap-6 justify-between transition-all duration-500 hover:border-primary/20 hover:bg-white/[0.03]">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
                
                <div className="flex flex-col gap-6 w-full">
                  <h3 className="text-lg font-semibold tracking-wide text-neutral-200 flex items-center gap-2">
                    <span className="size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs border border-primary/20 font-bold">2</span>
                    {t.selectMandala}
                  </h3>

                  {/* Preloaded Mandalas Grid */}
                  <div className="grid grid-cols-3 gap-3 w-full">
                    {PRECOLLECTED_MANDALAS.map((mandala) => {
                      const isSelected = selectedMandalaId === mandala.id;
                      return (
                        <div
                          key={mandala.id}
                          onClick={() => handleSelectMandala(mandala.id)}
                          className={`relative aspect-square rounded-xl overflow-hidden border cursor-pointer transition-all duration-300 flex items-center justify-center bg-black/60 group/mandala ${
                            isSelected
                              ? "border-primary shadow-lg shadow-primary/10 scale-95"
                              : "border-white/5 hover:border-white/20 hover:bg-white/[0.03]"
                          }`}
                        >
                          <BlurImage
                            src={mandala.src}
                            alt={mandala.name}
                            fill
                            sizes="(max-width: 768px) 33vw, 200px"
                            className="object-cover opacity-80 group-hover/mandala:opacity-100 transition-opacity p-2"
                          />
                          {isSelected && (
                            <div className="absolute top-2 right-2 size-5 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-black/80 z-10 border border-black/20">
                              <Check className="size-3 text-black stroke-[3px]" />
                            </div>
                          )}
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-center">
                            <span className="text-[0.65rem] tracking-wider text-neutral-400 group-hover/mandala:text-white transition-colors truncate block">
                              {mandala.name}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="relative flex items-center justify-center py-2">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-white/5" />
                    </div>
                    <span className="relative bg-[#080808] px-3 text-[0.6rem] tracking-widest text-neutral-500 uppercase">
                      {lang === "es" ? "O sube una referencia" : "Or upload reference"}
                    </span>
                  </div>

                  {/* Custom Mandala Uploader */}
                  <input
                    type="file"
                    ref={customMandalaInputRef}
                    onChange={handleCustomMandalaUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  {customMandalaImage ? (
                    <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden border border-primary/20 bg-black flex items-center justify-center group/customPreview">
                      <img
                        src={customMandalaImage}
                        alt="Custom Reference"
                        className="w-full h-full object-cover opacity-90"
                      />
                      <div className="absolute top-2 right-2 size-5 rounded-full bg-primary flex items-center justify-center border border-black/20">
                        <Check className="size-3 text-black stroke-[3px]" />
                      </div>
                      <button
                        onClick={() => customMandalaInputRef.current?.click()}
                        className="absolute inset-0 bg-black/70 opacity-0 group-hover/customPreview:opacity-100 transition-opacity flex items-center justify-center gap-2 cursor-pointer text-xs font-semibold uppercase tracking-wider text-primary"
                      >
                        <RefreshCw className="size-4" />
                        {lang === "es" ? "Cambiar Referencia" : "Change Reference"}
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => customMandalaInputRef.current?.click()}
                      className="w-full py-4 rounded-xl border border-dashed border-white/10 hover:border-primary/30 hover:bg-primary/[0.01] flex items-center justify-center gap-3 cursor-pointer group/custUploader transition-all duration-300"
                    >
                      <UploadCloud className="size-5 text-neutral-500 group-hover/custUploader:text-primary transition-colors animate-pulse" />
                      <span className="text-xs font-medium text-neutral-400 group-hover/custUploader:text-white transition-colors">
                        {t.customReference}
                      </span>
                    </div>
                  )}
                </div>

                {/* Direct Launch Button */}
                <div className="w-full pt-4">
                  <button
                    onClick={handleGenerate}
                    disabled={!wallImage || !selectedMandalaId}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black font-semibold text-sm cursor-pointer transition-all duration-300 shadow-xl shadow-amber-500/10 flex items-center justify-center gap-2 disabled:opacity-30 disabled:pointer-events-none group"
                  >
                    <Sparkles className="size-4 group-hover:scale-125 transition-transform" />
                    {t.generateButton}
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : generating ? (
            /* Premium Rotating Mandala Loading Screen */
            <motion.div
              key="loading-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-2xl rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-xl p-8 sm:p-12 flex flex-col items-center justify-center gap-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

              {/* Glowing Ambient Backdrop */}
              <div className="absolute size-72 rounded-full bg-primary/10 filter blur-[80px] -z-10 animate-pulse" />

              {/* Exquisite Rotating Spinner Icon */}
              <div className="relative size-36 sm:size-44 flex items-center justify-center">
                {/* Outermost ring */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-dashed border-primary/20"
                />
                {/* Middle ring */}
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                  className="absolute inset-4 rounded-full border border-double border-primary/30"
                />
                {/* Center SVG Sacred Geometry */}
                <motion.svg
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                  viewBox="0 0 100 100"
                  className="size-20 sm:size-24 text-primary opacity-80"
                >
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
                  <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" />
                  <path d="M 50,10 L 50,90 M 10,50 L 90,50 M 22,22 L 78,78 M 22,78 L 78,22" stroke="currentColor" strokeWidth="0.5" />
                  <polygon points="50,10 78,22 90,50 78,78 50,90 22,78 10,50 22,22" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  <polygon points="50,25 68,32 75,50 68,68 50,75 32,68 25,50 32,32" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </motion.svg>
              </div>

              {/* Step-by-Step Progress Logs */}
              <div className="flex flex-col items-center gap-3 text-center w-full max-w-sm">
                <span className="text-xs uppercase tracking-[0.25em] text-primary/80 font-bold">
                  {t.generatingButton}
                </span>
                
                <div className="h-6 overflow-hidden flex flex-col justify-center relative w-full">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={loadingStepIndex}
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -15, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="text-sm text-neutral-400 font-medium tracking-wide"
                    >
                      {loadingSteps[loadingStepIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Subtle progress track */}
                <div className="w-full h-[1px] bg-white/5 rounded-full overflow-hidden mt-2 relative">
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 15, ease: "easeInOut" }}
                    className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-amber-400 to-amber-600"
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            /* Card 3: comparative gorgeous visual output */
            <motion.div
              key="output-gallery"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col gap-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                
                {/* Left: Original Wall Photo */}
                <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 flex flex-col gap-4">
                  <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                    {t.originalWall}
                  </span>
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-black flex items-center justify-center">
                    {wallImage && (
                      <img
                        src={wallImage}
                        alt="Original Wall"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>

                {/* Right: Gorgeous AI Generated Output */}
                <div className="rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/[0.02] to-transparent p-6 flex flex-col gap-4 relative">
                  <div className="absolute top-0 right-6 -translate-y-1/2 bg-primary text-black text-[0.6rem] tracking-[0.2em] font-extrabold px-3 py-1 rounded-full uppercase border border-black/20">
                    AI Spatial Mural
                  </div>
                  
                  <span className="text-xs font-semibold tracking-wider text-primary uppercase">
                    {t.generatedMural}
                  </span>
                  
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-primary/10 bg-black flex items-center justify-center shadow-2xl shadow-primary/5 group/output">
                    {generatedResult && (
                      <img
                        src={generatedResult}
                        alt="AI Painted Wall Mural"
                        className="w-full h-full object-cover group-hover/output:scale-[1.02] transition-transform duration-700"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04] text-neutral-300 hover:text-white text-sm font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <RefreshCw className="size-4 group-hover:rotate-180 transition-transform duration-500" />
                  {lang === "es" ? "Diseñar Otra Pared" : "Design Another Wall"}
                </button>
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black font-semibold text-sm cursor-pointer transition-all duration-300 shadow-xl shadow-amber-500/10 flex items-center justify-center gap-2 group"
                >
                  <Download className="size-4 group-hover:translate-y-0.5 transition-transform" />
                  {t.downloadButton}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
