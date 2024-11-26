'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import {
    AlertTriangle,
    CopyIcon,
    FileIcon,
    Loader,
    MoreHorizontal,
    Search,
    Trash,
} from 'lucide-react';

import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { useDeleteProject } from '@/features/projects/api/use-delete-project';
import { useDuplicateProject } from '@/features/projects/api/use-duplicate-project';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const ProjectsSection = () => {
    const router = useRouter();
    const duplicateMutation = useDuplicateProject();
    const deleteMutation = useDeleteProject();

    const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
        useGetProjects();

    const onCopy = (id: string) => {
        duplicateMutation.mutate({ id });
    };

    const onDelete = (id: string) => {
        deleteMutation.mutate({ id });
    };

    if (status === 'error') {
        return (
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recent projects</h3>
                <div className="flex h-32 flex-col items-center justify-center gap-y-4">
                    <AlertTriangle className="text-muted-foreground size-6" />
                    <p className="text-muted-foreground text-sm">
                        Failed to load projects
                    </p>
                </div>
            </div>
        );
    }

    if (status === 'pending') {
        return (
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recent projects</h3>
                <div className="flex h-32 flex-col items-center justify-center gap-y-4">
                    <Loader className="text-muted-foreground size-6 animate-spin" />
                </div>
            </div>
        );
    }

    if (!data?.pages.length) {
        return (
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recent projects</h3>
                <div className="flex h-32 flex-col items-center justify-center gap-y-4">
                    <Search className="text-muted-foreground size-6" />
                    <p className="text-muted-foreground text-sm">
                        No projects found
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Recent projects</h3>
            <Table>
                <TableBody>
                    {data.pages.map((group, i) => (
                        <React.Fragment key={i}>
                            {group.data.map(project => (
                                <TableRow key={project.id}>
                                    <TableCell
                                        onClick={() =>
                                            router.push(`/editor/${project.id}`)
                                        }
                                        className="flex cursor-pointer items-center gap-x-2 font-medium"
                                    >
                                        <FileIcon className="size-6" />
                                        {project.name}
                                    </TableCell>
                                    <TableCell
                                        onClick={() =>
                                            router.push(`/editor/${project.id}`)
                                        }
                                        className="hidden cursor-pointer md:table-cell"
                                    >
                                        {project.width} x {project.height} px
                                    </TableCell>
                                    <TableCell
                                        onClick={() =>
                                            router.push(`/editor/${project.id}`)
                                        }
                                        className="hidden cursor-pointer md:table-cell"
                                    >
                                        {formatDistanceToNow(
                                            project.createdAt,
                                            {
                                                addSuffix: true,
                                            },
                                        )}
                                    </TableCell>
                                    <TableCell className="flex items-center justify-end">
                                        <DropdownMenu modal={false}>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    disabled={false}
                                                    size="icon"
                                                    variant="ghost"
                                                >
                                                    <MoreHorizontal className="size-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                align="end"
                                                className="w-60"
                                            >
                                                <DropdownMenuItem
                                                    disabled={
                                                        duplicateMutation.isPending
                                                    }
                                                    onClick={() =>
                                                        onCopy(project.id)
                                                    }
                                                    className="h-10 cursor-pointer"
                                                >
                                                    <CopyIcon className="mr-2 size-4" />
                                                    Make a copy
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    disabled={
                                                        deleteMutation.isPending
                                                    }
                                                    onClick={() =>
                                                        onDelete(project.id)
                                                    }
                                                    className="h-10 cursor-pointer"
                                                >
                                                    <Trash className="mr-2 size-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
            {hasNextPage && (
                <div className="flex w-full items-center justify-center pt-4">
                    <Button
                        disabled={isFetchingNextPage}
                        variant="ghost"
                        onClick={() => fetchNextPage()}
                    >
                        Load more
                    </Button>
                </div>
            )}
        </div>
    );
};
