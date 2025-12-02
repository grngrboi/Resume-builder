import { motion, useMotionValue, useSpring } from "framer-motion";
import React, {
    PropsWithChildren,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from "react";

interface BubbleProps extends PropsWithChildren {
    className?: string;
    interactive?: boolean;
    strength?: number;
    blur?: number;
    background?: string;
    color?: string;
    radius?: number;
    particle?: ReactNode;
    particleCount?: number;
    particleSize?: number;
    particleColor?: string;
    particleBlur?: number;
    particleRadius?: number;
    particleStrength?: number;
}

export const InteractiveBubble = ({
    children,
    className,
    interactive = true,
    strength = 100,
    blur = 10,
    background = "bg-gradient-to-br from-indigo-500 to-purple-500",
    color = "bg-gradient-to-br from-indigo-500 to-purple-500",
    radius = 100,
    particle,
    particleCount = 10,
    particleSize = 10,
    particleColor = "bg-gradient-to-br from-indigo-500 to-purple-500",
    particleBlur = 10,
    particleRadius = 100,
    particleStrength = 100,
}: BubbleProps) => {
    const [isSafari, setIsSafari] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 500, damping: 100 });
    const springY = useSpring(mouseY, { stiffness: 500, damping: 100 });
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
        const handleMouseMove = (e: MouseEvent) => {
            if (ref.current && interactive) {
                const rect = ref.current.getBoundingClientRect();
                mouseX.set(e.clientX - rect.left);
                mouseY.set(e.clientY - rect.top);
            }
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [interactive, mouseX, mouseY]);

    return (
        <div
            ref={ref}
            className={`relative w-full h-full overflow-hidden ${className}`}
        >
            <div className={`absolute inset-0 ${background}`} />
            {/* SVG filter for gooey effect */}
            {!isSafari && (
                <svg className="absolute w-0 h-0">
                    <filter id="goo">
                        <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation={blur}
                            result="blur"
                        />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${strength} -7`}
                            result="goo"
                        />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </svg>
            )}

            {/* Interactive bubble */}
            {interactive && (
                <motion.div
                    style={{
                        translateX: springX,
                        translateY: springY,
                        filter: isSafari ? undefined : "url(#goo)",
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-0 h-0`}
                >
                    <div
                        className={`absolute -translate-x-1/2 -translate-y-1/2 ${color} rounded-full`}
                        style={{ width: radius * 2, height: radius * 2 }}
                    />
                </motion.div>
            )}

            {/* Particles */}
            {Array.from({ length: particleCount }).map((_, i) => (
                <Particle
                    key={i}
                    interactive={interactive}
                    strength={particleStrength}
                    blur={particleBlur}
                    color={particleColor}
                    radius={particleRadius}
                    size={particleSize}
                    isSafari={isSafari}
                >
                    {particle}
                </Particle>
            ))}

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </div>
    );
};

const Particle = ({
    children,
    interactive,
    strength,
    blur,
    color,
    radius,
    size,
    isSafari,
}: {
    interactive: boolean;
    strength: number;
    blur: number;
    color: string;
    radius: number;
    size: number;
    isSafari: boolean;
    children?: ReactNode;
}) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (ref.current && interactive) {
                const rect = ref.current.getBoundingClientRect();
                mouseX.set(e.clientX - rect.left - rect.width / 2);
                mouseY.set(e.clientY - rect.top - rect.height / 2);
            }
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [interactive, mouseX, mouseY]);

    const randomX = Math.random() * 100 - 50;
    const randomY = Math.random() * 100 - 50;
    const randomDelay = Math.random() * 2;

    return (
        <motion.div
            ref={ref}
            style={{
                translateX: springX,
                translateY: springY,
                filter: isSafari ? undefined : "url(#goo)",
            }}
            animate={{
                x: [0, randomX, 0],
                y: [0, randomY, 0],
                scale: [1, 1.1, 1],
            }}
            transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
                delay: randomDelay,
            }}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0`}
        >
            <div
                className={`absolute -translate-x-1/2 -translate-y-1/2 ${color} rounded-full`}
                style={{ width: size, height: size }}
            />
            {children}
        </motion.div>
    );
};
