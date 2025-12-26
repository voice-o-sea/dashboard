import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import type { Document } from '@/types/document';
import DocumentForm from './document-form';
import {
    useCreateDocument,
    useUpdateDocument,
    useDeleteDocument,
} from '@/hooks/use-documents';
import { Loader2 } from 'lucide-react';

interface ActionDialogProps {
    open: boolean;
    data: Document | null;
    type: 'create' | 'edit' | 'delete' | null;
    onClose: () => void;
}

export function ActionDialog({ open, data, type, onClose }: ActionDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [dialogData, setDialogData] = useState<Document | null>(data);

    useEffect(() => {
        setIsOpen(open);
        if (!open) {
            setDialogData(null);
        }
    }, [open]);

    useEffect(() => {
        setDialogData(data);
    }, [data]);

    const handleOpenChange = (value: boolean) => {
        setIsOpen(value);
        if (!value) {
            setDialogData(null);
            onClose();
        }
    };

    const { mutateAsync: insertDocument } = useCreateDocument();
    const { mutateAsync: updateDocument } = useUpdateDocument();
    const { mutateAsync: deleteDocument, isPending: isDeleting } =
        useDeleteDocument();

    const handleSubmit = async (values: Document) => {
        try {
            let result: Document | null = null;
            if (type === 'create') {
                result = await insertDocument(values);
            } else {
                result = await updateDocument(values);
            }
            if (result) {
                toast.success(
                    type === 'create'
                        ? 'Document created.'
                        : 'Document updated.'
                );
                handleOpenChange(false);
                return true;
            } else {
                toast.error('Action failed.');
                return false;
            }
        } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Action failed.');
            return false;
        }
    };

    const handleDelete = async () => {
        if (dialogData?.id) {
            const result = await deleteDocument(dialogData.id);
            if (result) {
                toast.success('Document deleted.');
                handleOpenChange(false);
                return true;
            }
            toast.error('Action failed.');
            return false;
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className='sm:max-w-[425px] max-h-full'>
                {type === 'create' && (
                    <DialogHeader>
                        <DialogTitle>New Document</DialogTitle>
                        <DialogDescription>
                            Fill document fields and save
                        </DialogDescription>
                    </DialogHeader>
                )}
                {type === 'edit' && (
                    <DialogHeader>
                        <DialogTitle>Edit Document</DialogTitle>
                        <DialogDescription>
                            Edit document fields and save
                        </DialogDescription>
                    </DialogHeader>
                )}
                {(type === 'create' || type === 'edit') && (
                    <DocumentForm
                        initialData={dialogData}
                        onSubmit={handleSubmit}
                        onClose={() => {
                            handleOpenChange(false);
                        }}
                    />
                )}
                {type === 'delete' && (
                    <>
                        <DialogHeader>
                            <DialogTitle className=''>
                                Delete Document
                            </DialogTitle>
                            <DialogDescription>
                                Are you sure you want to permanently delete
                                document?
                            </DialogDescription>
                        </DialogHeader>
                        <div>
                            <Button
                                type='submit'
                                aria-label='Submit'
                                variant='destructive'
                                disabled={isDeleting}
                                onClick={handleDelete}
                                className='mt-4 w-36'
                            >
                                {isDeleting ? (
                                    <Loader2 className='h-4 w-8 animate-spin' />
                                ) : (
                                    'Delete Document'
                                )}
                            </Button>
                            <Button
                                type='button'
                                aria-label='Cancel'
                                variant='outline'
                                onClick={() => {
                                    handleOpenChange(false);
                                }}
                                className='mt-4 ml-4'
                            >
                                Cancel
                            </Button>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
