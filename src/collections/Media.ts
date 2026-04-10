import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
    slug: 'media',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
        },
        {
            name: 'tags',
            type: 'text',
            hasMany: true,
            admin: {
                description: 'Comma-separated tags for categorizing the image.',
                position: 'sidebar',
            },
        },
        {
            name: 'aspectRatio',
            type: 'number',
            admin: {
                description: 'The aspect ratio of the image (width divided by height). This is calculated automatically on upload and can be used for layout purposes.',
                position: 'sidebar',
            },
        }
    ],
    hooks: {
        beforeChange: [
            ({ data, operation }) => {
                if (data.width && data.height && (operation === 'create' || !data.aspectRatio)) {
                    data.aspectRatio = data.width / data.height
                }
                return data
            },
        ],
    },
    upload: {
        // These are not supported on Workers yet due to lack of sharp
        crop: false,
        focalPoint: false,
    },
}
