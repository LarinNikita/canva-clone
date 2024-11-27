import Image from 'next/image';
import { Crown } from 'lucide-react';

import { cn } from '@/lib/utils';

interface TemplateCardProps {
    imageSrc: string;
    title: string;
    onClick: () => void;
    disable?: boolean;
    description: string;
    width: number;
    height: number;
    isPro: boolean | null;
}

export const TemplateCard = ({
    imageSrc,
    title,
    onClick,
    disable,
    description,
    width,
    height,
    isPro,
}: TemplateCardProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disable}
            className={cn(
                'group flex flex-col space-y-2 text-left transition',
                disable ? 'cursor-not-allowed opacity-75' : 'cursor-pointer',
            )}
        >
            <div
                style={{
                    aspectRatio: `${width}/${height}`,
                }}
                className="relative size-full overflow-hidden rounded-xl border"
            >
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="transform object-cover transition group-hover:scale-105"
                />
                {isPro && (
                    <div className="absolute right-2 top-2 z-[10] flex size-10 items-center justify-center rounded-full bg-black/50">
                        <Crown className="size-5 fill-yellow-500 text-yellow-500" />
                    </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/50 opacity-0 backdrop-blur-sm backdrop-filter transition group-hover:opacity-100">
                    <p className="font-medium text-white">Open in editor</p>
                </div>
            </div>
            <div className="space-y-1">
                <p className="text-sm font-medium">{title}</p>
                <p className="text-muted-foreground text-xs opacity-0 transition group-hover:opacity-75">
                    {description}
                </p>
            </div>
        </button>
    );
};
