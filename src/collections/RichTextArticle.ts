import type { CollectionConfig } from 'payload'
import {
    lexicalEditor,
    BoldFeature,
    ItalicFeature,
    UnderlineFeature,
    StrikethroughFeature,
    HeadingFeature,
    ParagraphFeature,
    BlockquoteFeature,
    OrderedListFeature,
    UnorderedListFeature,
    LinkFeature,
    HorizontalRuleFeature,
    BlocksFeature,
    UploadFeature,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

/**
* A custom Lexical block that groups multiple images together into a gallery.
*
* HOW TO MODIFY:
* - Add more fields (e.g. a `caption` text field) by appending to the `fields` array.
* - Change `minRows`/`maxRows` to control how many images are allowed.
* - Add a `layout` select field (e.g. grid, carousel) to drive frontend rendering.
*/
const ImageGalleryBlock: Block = {
    slug: 'imageGallery',
    labels: {
        singular: 'Image Gallery',
        plural: 'Image Galleries',
    },
    fields: [
        {
            name: 'caption',
            type: 'text',
            label: 'Gallery Caption',
            admin: {
                description: 'Optional caption displayed beneath the gallery.',
            },
        },
        {
            name: 'layout',
            type: 'select',
            label: 'Layout',
            defaultValue: 'grid',
            options: [
                { label: 'Grid', value: 'grid' },
                { label: 'Masonry', value: 'masonry' },
                { label: 'Carousel', value: 'carousel' },
            ],
        },
        {
            name: 'images',
            type: 'array',
            label: 'Images',
            minRows: 1,
            maxRows: 20,
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
                    name: 'altText',
                    type: 'text',
                    label: 'Alt Text',
                    admin: {
                        description: 'Describe the image for screen readers.',
                    },
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

/**
* RichTextArticle collection
*
* Uses a fully custom Lexical editor configuration with an image gallery block.
*
* HOW TO ADD MORE LEXICAL FEATURES:
* 1. Import the feature from '@payloadcms/richtext-lexical'.
* 2. Add it to the `features` array in the `lexicalEditor()` call below.
* Common additional features: ChecklistFeature, CodeFeature, InlineCodeFeature,
*   RelationshipFeature, TableFeature.
*
* HOW TO ADD MORE CUSTOM BLOCKS:
* 1. Define a new `Block` object (like `ImageGalleryBlock` above).
* 2. Add it to the `blocks` array inside `BlocksFeature({ blocks: [...] })`.
*/
export const RichTextArticle: CollectionConfig = {
    slug: 'rich-text-articles',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'status', 'publishedAt'],
        description: 'Articles with a heavily customised Lexical rich text editor.',
    },
    access: {
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
            admin: { position: 'sidebar' },
        },
        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                position: 'sidebar',
                date: { pickerAppearance: 'dayAndTime' },
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
            name: 'excerpt',
            type: 'textarea',
            admin: {
                description: 'Short summary shown in article listings.',
            },
        },
        // ─── The customised rich text field ───────────────────────────────────────
        {
            name: 'content',
            type: 'richText',
            label: 'Content',
            required: true,
            editor: lexicalEditor({
                features: [
                    // ── Typography ─────────────────────────────────────────────────────
                    ParagraphFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                    BoldFeature(),
                    ItalicFeature(),
                    UnderlineFeature(),
                    StrikethroughFeature(),
                    BlockquoteFeature(),
                    
                    // ── Lists ──────────────────────────────────────────────────────────
                    OrderedListFeature(),
                    UnorderedListFeature(),
                    
                    // ── Embeds ─────────────────────────────────────────────────────────
                    LinkFeature(),
                    HorizontalRuleFeature(),
                    
                    // Inline image uploads (single image, different from the gallery block)
                    UploadFeature({
                        collections: {
                            media: {
                                fields: [
                                    {
                                        name: 'caption',
                                        type: 'text',
                                        label: 'Caption',
                                    },
                                    {
                                        name: 'alignment',
                                        type: 'select',
                                        label: 'Alignment',
                                        defaultValue: 'center',
                                        options: [
                                            { label: 'Left', value: 'left' },
                                            { label: 'Center', value: 'center' },
                                            { label: 'Right', value: 'right' },
                                        ],
                                    },
                                ],
                            },
                        },
                    }),
                    
                    // ── Custom blocks ──────────────────────────────────────────────────
                    BlocksFeature({
                        blocks: [
                            // ** Image Gallery block — groups multiple images **
                            ImageGalleryBlock,
                        ],
                    }),
                ],
            }),
        },
    ],
}
