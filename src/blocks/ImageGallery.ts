import type { Block } from "payload";

/**
 * A custom Lexical block that groups multiple images together into a group.
 */
export const ImageGalleryBlock: Block = {
    slug: 'image-gallery',
    labels: {
        singular: 'Image Gallery',
        plural: 'Image Galleries',
    },
    fields: [
        {
            name: 'force-aspect',
            type: 'number',
            label: 'Force Aspect Ratio',
            admin: {
                description: 'Force a specific aspect ratio for all images in the gallery. 0 or blank for no constraint.',
                step: 0.01,
            },
        },
        {
            name: 'images-per-row',
            type: 'number',
            label: 'Images Per Row',
            admin: {
                description: 'Number of images to display per row in the gallery. 0 or blank for automatic layout.',
                step: 1,
            },
        },
        {
            name: 'images',
            type: 'array',
            label: 'Images',
            minRows: 1,
            maxRows: 32,
            admin: {
                description: 'Add one or more images to this gallery.',
            },
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'caption',
                    type: 'text',
                    label: 'Image Caption',
                },
            ],
        },
    ],
}