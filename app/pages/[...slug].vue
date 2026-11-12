<script setup lang="ts">
const route = useRoute()

const { data: post } = await useNodeByUri(
  { uri: route.path },
  { watch: [() => route.path] }
)

const header = computed(() => {
  const node = post.value
  if (!node) return { title: '', date: '', image: '' }
  if ('contentTypeName' in node) {
    return {
      title: node.title ?? '',
      date: node.date ?? '',
      image: node.featuredImage?.node?.relativePath ?? ''
    }
  }
  return { title: node.name ?? '', date: '', image: '' }
})
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        :title="header.title"
        :date="header.date"
        :image="header.image"
      />
      <UPageBody>
        <UPageCard>
          <template v-if="post">
            <WPContent
              :node="post"
              class="prose prose-lg dark:prose-invert max-w-none"
            />
          </template>
          <LoadingPage v-else />
        </UPageCard>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
