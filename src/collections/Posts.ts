import type { CollectionConfig } from 'payload'
import { fa } from 'payload/i18n/fa'

export const Posts: CollectionConfig = {
    slug: 'posts',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'author', 'status', 'publishedAt'],
        description: 'Blog posts with rich content and images.',
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
            name: 'collaborators',
            type: 'array',
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'name',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'role',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'link',
                            type: 'text',
                        }
                    ],
                },
            ],
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
            name: 'tags',
            type: 'text',
            hasMany: true,
            admin: {
                description: 'Comma-separated tags for categorising the post.',
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
                    slug: 'heading',
                    fields: [
                        {
                            name: 'text',
                            type: 'text',
                            required: true,
                        },
                    ],
                },
                {
                    slug: 'subheading',
                    fields: [
                        {
                            name: 'text',
                            type: 'text',
                            required: true,
                        },
                    ],
                },
                {
                    slug: 'paragraph',
                    fields: [
                        {
                            name: 'text',
                            type: 'richText',
                            required: true,
                        },
                    ],
                },
                {
                    slug: 'images',
                    fields: [
                        {
                            name: 'images',
                            type: 'array',
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
                        }
                    ],
                },
            ],
        },
        {
            name: 'seo',
            type: 'group',
            label: 'SEO',
            fields: [
                {
                    name: 'metaTitle',
                    type: 'text',
                    admin: {
                        description: 'Defaults to the post title if left blank.',
                    },
                },
                {
                    name: 'metaDescription',
                    type: 'textarea',
                    admin: {
                        description: 'Defaults to the excerpt if left blank.',
                        rows: 3,
                    },
                },
                {
                    name: 'ogImage',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'Open Graph Image',
                    admin: {
                        description: 'Defaults to the featured image if left blank.',
                    },
                },
            ],
        },
    ],
}