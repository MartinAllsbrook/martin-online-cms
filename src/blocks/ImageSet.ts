import type { Block } from 'payload'

/**
 * A custom Lexical block that groups multiple images together into a group.
 */
export const ImageSetBlock: Block = {
    slug: 'image-set',
    labels: {
        singular: 'Image Set',
        plural: 'Image Sets',
    },
    fields: [
        {
            name: 'images',
            type: 'array',
            label: 'Images',
            minRows: 1,
            maxRows: 4,
            admin: {
                description: 'Add one or more images to this set.',
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