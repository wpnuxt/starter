<script setup lang="ts">
const orderField = ref('DATE')
const order = ref<'ASC' | 'DESC'>('DESC')

const { data: posts } = await usePosts(() => ({
  orderField: orderField.value,
  order: order.value
}))
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        title="Blog"
        description="Read our latest blog posts"
      />
      <UPageBody>
        <OrderOptions v-model:order-field="orderField" v-model:order="order" />
        <UBlogPosts>
          <UBlogPost
            v-for="post in posts"
            :key="post.id"
            :title="post.title ?? undefined"
            :to="post.uri"
            :date="post.date ?? undefined"
            :image="post.featuredImage?.node?.relativePath ?? ''"
            variant="outline"
          >
            <template #description>
              <div v-sanitize-html="post.excerpt" />
            </template>
          </UBlogPost>
        </UBlogPosts>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
