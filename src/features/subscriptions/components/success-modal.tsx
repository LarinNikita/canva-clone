'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useSuccessModal } from '@/features/subscriptions/store/use-success-modal';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';

export const SuccessModal = () => {
    const router = useRouter();
    const { isOpen, onClose } = useSuccessModal();

    const handleClose = () => {
        router.replace('/');
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader className="flex items-center space-y-4">
                    <Image src="/logo.svg" alt="Logo" width={36} height={36} />
                    <DialogTitle className="text-center">
                        Subscription successful
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        You have successfully subscribed to our service
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="mt-4 gap-y-2 pt-2">
                    <Button className="w-full" onClick={handleClose}>
                        Continue
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
