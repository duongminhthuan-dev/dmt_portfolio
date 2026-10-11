'use client';

import { motion, useMotionValue, useTransform, type PanInfo } from 'motion/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CldImage } from 'next-cloudinary';

export interface CardItem {
  id: number;
  image: string;
  title: string;
  description: string;
  href: string;
}

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  disableDrag?: boolean;
}

function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  if (disableDrag) {
    return (
      <motion.div className="absolute inset-0 cursor-pointer" style={{ x: 0, y: 0 }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 cursor-grab"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  sendToBackOnClick?: boolean;
  cardItems?: CardItem[];
  animationConfig?: { stiffness: number; damping: number };
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  mobileClickOnly?: boolean;
  mobileBreakpoint?: number;
}

const defaultCardItems: CardItem[] = [
  {
    id: 1,
    image: 'ananas_main',
    title: 'Ananas Redesign',
    description: "Redeveloped the Ananas website with a modern design. A Web Programming subject's project. Built with React and Tailwind CSS.",
    href: '/works/softwareengineering/ananas'
  },
  {
    id: 2,
    image: 'bkdocs1_main',
    title: 'BKDocs',
    description: 'A mobile app made for HCMUT students to manage their learning materials. Built with React Native.',
    href: '/works/softwareengineering/bkdocs'
  }
];

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cardItems = defaultCardItems,
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileClickOnly = false,
  mobileBreakpoint = 768
}: StackProps) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  const [randomRotations, setRandomRotations] = useState<number[]>([]);

  useEffect(() => {
    setIsClient(true);
    if (randomRotation && cardItems.length > 0) {
      setRandomRotations(cardItems.map(() => Math.random() * 6 - 3));
    }
  }, [randomRotation, cardItems.length]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  const shouldDisableDrag = mobileClickOnly && isMobile;
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

  const [stack, setStack] = useState<CardItem[]>(() => cardItems);

  useEffect(() => {
    if (cardItems.length) {
      setStack(cardItems);
    }
  }, [cardItems]);

  const handleCardClick = (card: CardItem, isTopCard: boolean) => {
    if (!isTopCard) {
      sendToBack(card.id);
      return;
    }
    
    if (card.href && card.href !== '#') {
      router.push(card.href);
    }
  };

  const sendToBack = (id: number) => {
    setStack(prev => {
      const newStack = [...prev];
      const index = newStack.findIndex(card => card.id === id);
      const [card] = newStack.splice(index, 1);
      newStack.unshift(card);
      return newStack;
    });
  };

  useEffect(() => {
    if (autoplay && stack.length > 1 && !isPaused) {
      const interval = setInterval(() => {
        const topCardId = stack[stack.length - 1].id;
        sendToBack(topCardId);
      }, autoplayDelay);

      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayDelay, stack, isPaused]);

  return (
    <div
      className="relative w-full h-full"
      style={{
        perspective: 600
      }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {stack.map((card, index) => {
        const isTopCard = index === stack.length - 1;
        const randomRotate = randomRotation && isClient ? (randomRotations[card.id - 1] || 0) : 0;
        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
            disableDrag={shouldDisableDrag}
          >
            <motion.div
              className="rounded-2xl overflow-hidden w-full h-full bg-[#ffffff] flex flex-col shadow-xl border-gray-200 border-1"
              onClick={() => handleCardClick(card, isTopCard)}
              animate={{
                rotateZ: (stack.length - index - 1) * 2 + randomRotate,
                scale: 1 + index * 0.06 - stack.length * 0.06,
                transformOrigin: '90% 90%'
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping
              }}
            >
              <div className="flex-1 overflow-hidden relative">
                <CldImage
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover pointer-events-none"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
              <div className="p-4 bg-[#ffffff]">
                <h3 
                  className="text-lg mb-1 truncate"
                  style={{ fontFamily: 'SFProDisplay-Medium, sans-serif' }}
                >
                  {card.title}
                </h3>
                <p 
                  className="text-sm line-clamp-3 text-gray-500"
                  style={{ fontFamily: 'SFProDisplay-Light, sans-serif' }}
                >
                  {card.description}
                </p>
              </div>
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
