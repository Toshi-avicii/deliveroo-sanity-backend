import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Restaurant Name',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'short_description',
      type: 'string',
      title: 'Description',
      validation: (Rule) => Rule.max(200)
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image of the Restaurant',
    }),
    defineField({
      name: 'lat',
      type: 'number',
      title: 'Latitude of the Restaurant'
    }),
    defineField({
      name: 'long',
      type: 'number',
      title: 'Longitude',
    }),
    defineField({
      name: 'address',
      type: 'string',
      title: 'Address',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'rating',
      type: 'number',
      title: 'Rating of the restaurant',
      validation: (Rule) => 
        Rule.required()
        .min(1)
        .max(5)
        .error('Please enter a rating between 1 and 5')
    }),
    defineField({
      name: 'type',
      type: 'reference',
      title: 'Category',
      validation: (Rule) => Rule.required(),
      to: [{ type: 'category' }]
    }),
    defineField({
      name: 'dishes',
      type: 'array',
      title: 'Dishes',
      of: [{ type: 'reference', to: [{ type: 'dish' }] }]
    })
  ],
})
