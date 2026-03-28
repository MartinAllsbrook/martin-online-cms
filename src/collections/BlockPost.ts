import type { CollectionConfig } from 'payload'

export const BlockPost: CollectionConfig = {
    slug: 'block-post',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'author', 'status', 'publishedAt'],
        description: 'A more structured form of blog post',
    },
    access: {
        // Anyone can read published posts
        read: ({ req: { user } }) => {
            if (user) return true
            return { status: { equals: 'published' } }
        },
        create: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
        delete: ({ req: { user } }) => Boolean(user),
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            index: true,
            admin: {
                description: 'URL-friendly identifier. Auto-populated from title if left blank.',
            },
            hooks: {
                beforeValidate: [
                    ({ value, siblingData }) => {
                        if (value) return value
                        return siblingData?.title
                        ?.toLowerCase()
                        .trim()
                        .replace(/[^\w\s-]/g, '')
                        .replace(/[\s_-]+/g, '-')
                        .replace(/^-+|-+$/g, '')
                    },
                ],
            },
        },
        {
            name: 'status',
            type: 'select',
            required: true,
            defaultValue: 'draft',
            options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Published', value: 'published' },
            ],
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                position: 'sidebar',
                description: 'Leave blank to use the current date when publishing.',
                date: {
                    pickerAppearance: 'dayAndTime',
                },
            },
            hooks: {
                beforeChange: [
                    ({ siblingData, value }) => {
                        if (siblingData?.status === 'published' && !value) {
                            return new Date()
                        }
                        return value
                    },
                ],
            },
        },
        {
            name: 'author',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'featuredImage',
            type: 'upload',
            relationTo: 'media',
            admin: {
                description: 'Main image displayed at the top of the post and in previews.',
            },
        },
        {
            name: 'content',
            type: 'blocks',
            blocks: [
                {
                    slug: 'text',
                    fields: [
                        {
                            name: 'text',
                            type: 'richText',
                            required: true,
                        },
                    ],
                },
                {
                    slug: 'image',
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
                        },
                    ],
                },
            ],
        }
    ],
}