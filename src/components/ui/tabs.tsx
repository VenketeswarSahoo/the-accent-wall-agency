"use client";

import { type HTMLMotionProps, motion, type Transition } from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";

// Tabs Component
interface TabsContextType<T extends string> {
  activeValue: T;
  handleValueChange: (value: T) => void;
  registerTrigger: (value: T, node: HTMLElement | null) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TabsContext = React.createContext<TabsContextType<any> | undefined>(
  undefined,
);

function useTabs<T extends string = string>(): TabsContextType<T> {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("useTabs must be used within a TabsProvider");
  }
  return context;
}

type BaseTabsProps = React.ComponentProps<"div"> & {
  children: React.ReactNode;
};

type UnControlledTabsProps<T extends string = string> = BaseTabsProps & {
  defaultValue?: T;
  value?: never;
  onValueChange?: never;
};

type ControlledTabsProps<T extends string = string> = BaseTabsProps & {
  value: T;
  onValueChange?: (value: T) => void;
  defaultValue?: never;
};

type TabsProps<T extends string = string> =
  | UnControlledTabsProps<T>
  | ControlledTabsProps<T>;

function Tabs<T extends string = string>({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
  ...props
}: TabsProps<T>) {
  const [activeValue, setActiveValue] = React.useState<T | undefined>(
    defaultValue ?? undefined,
  );
  const triggersRef = React.useRef(new Map<string, HTMLElement>());
  const initialSet = React.useRef(false);
  const isControlled = value !== undefined;

  React.useEffect(() => {
    if (
      !isControlled &&
      activeValue === undefined &&
      triggersRef.current.size > 0 &&
      !initialSet.current
    ) {
      const firstTab = Array.from(triggersRef.current.keys())[0];
      setActiveValue(firstTab as T);
      initialSet.current = true;
    }
  }, [activeValue, isControlled]);

  const registerTrigger = (value: string, node: HTMLElement | null) => {
    if (node) {
      triggersRef.current.set(value, node);
      if (!isControlled && activeValue === undefined && !initialSet.current) {
        setActiveValue(value as T);
        initialSet.current = true;
      }
    } else {
      triggersRef.current.delete(value);
    }
  };

  const handleValueChange = (val: T) => {
    if (isControlled) {
      onValueChange?.(val);
    } else {
      setActiveValue(val);
    }
  };

  return (
    <TabsContext.Provider
      value={{
        activeValue: (value ?? activeValue)!,
        handleValueChange,
        registerTrigger,
      }}
    >
      <div
        className={cn("flex flex-col gap-2", className)}
        data-slot="tabs"
        {...(props as React.ComponentProps<"div">)}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

type TabsListProps = React.ComponentProps<"div"> & {
  children: React.ReactNode;
};

function TabsList({
  children,
  className,
  ...props
}: TabsListProps) {
  return (
    <div
      className={cn(
        "bg-muted text-muted-foreground relative inline-flex h-10 w-fit items-center justify-center rounded-4xl p-1 overflow-hidden",
        className,
      )}
      data-slot="tabs-list"
      role="tablist"
      {...props}
    >
      {children}
    </div>
  );
}

type TabsTriggerProps = HTMLMotionProps<"button"> & {
  value: string;
  children: React.ReactNode;
};

function TabsTrigger({
  ref,
  value,
  children,
  className,
  ...props
}: TabsTriggerProps) {
  const { activeValue, handleValueChange, registerTrigger } = useTabs();
  const isActive = activeValue === value;

  // Track if this is the first time the component is rendering to skip entrance animation
  const [isFirstRender, setIsFirstRender] = React.useState(true);
  React.useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setIsFirstRender(false);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  const localRef = React.useRef<HTMLButtonElement | null>(null);
  React.useImperativeHandle(
    ref as React.Ref<HTMLButtonElement>,
    () => localRef.current as HTMLButtonElement,
  );

  React.useEffect(() => {
    registerTrigger(value, localRef.current);
    return () => registerTrigger(value, null);
  }, [value, registerTrigger]);

  return (
    <motion.button
      className={cn(
        "relative inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-4xl px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 z-[1]",
        isActive ? "text-foreground" : "hover:text-foreground/80",
        className,
      )}
      data-slot="tabs-trigger"
      data-state={isActive ? "active" : "inactive"}
      onClick={() => handleValueChange(value)}
      ref={localRef}
      role="tab"
      whileTap={{ scale: 0.96 }}
      {...props}
    >
      {isActive && (
        <motion.div
          layoutId="active-tab"
          className="absolute inset-0 z-[-1] rounded-4xl bg-background shadow-sm"
          initial={false}
          transition={
            isFirstRender
              ? { duration: 0 }
              : {
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }
          }
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

type TabsContentsProps = React.ComponentProps<"div"> & {
  children: React.ReactNode;
  transition?: Transition;
};

function TabsContents({
  children,
  className,
  transition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    bounce: 0,
    restDelta: 0.01,
  },
  ...props
}: TabsContentsProps) {
  const { activeValue } = useTabs();
  const childrenArray = React.Children.toArray(children);
  const activeIndex = Math.max(
    0,
    childrenArray.findIndex(
      (child): child is React.ReactElement<{ value: string }> =>
        React.isValidElement(child) &&
        typeof child.props === "object" &&
        child.props !== null &&
        "value" in child.props &&
        child.props.value === activeValue,
    ),
  );

  return (
    <div
      className={cn("overflow-hidden", className)}
      data-slot="tabs-contents"
      {...(props as React.ComponentProps<"div">)}
    >
      <motion.div
        animate={{ x: `${activeIndex * -100}%` }}
        initial={false}
        className="flex -mx-2"
        transition={transition}
      >
        {childrenArray.map((child, index) => (
          <div className="w-full shrink-0 px-2" key={index}>
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

type TabsContentProps = HTMLMotionProps<"div"> & {
  value: string;
  children: React.ReactNode;
};

function TabsContent({
  children,
  value,
  className,
  ...props
}: TabsContentProps) {
  const { activeValue } = useTabs();
  const isActive = activeValue === value;
  return (
    <motion.div
      animate={{ filter: isActive ? "blur(0px)" : "blur(4px)" }}
      initial={false}
      className={cn("overflow-hidden", className)}
      data-slot="tabs-content"
      exit={{ filter: "blur(0px)" }}
      role="tabpanel"
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      {...(props as HTMLMotionProps<"div">)}
    >
      {children}
    </motion.div>
  );
}

export {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
  useTabs,
  type TabsContentProps,
  type TabsContentsProps,
  type TabsContextType,
  type TabsListProps,
  type TabsProps,
  type TabsTriggerProps,
};
