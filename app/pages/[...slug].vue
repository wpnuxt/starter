<script setup lang="ts">
const route = useRoute()

const { data: post } = await useNodeByUri(
  { uri: route.path },
  { watch: [() => route.path] }
)
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        :title="post?.title ?? ''"
        :date="post?.date ?? ''"
        :image="post?.featuredImage?.node?.relativePath ?? ''"
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
