<script setup lang="ts">
import type { MenuItemFragment } from '#graphql-operations'

const { data } = await useMenu({ name: 'main' })
const runtimeConfig = useRuntimeConfig()

const menu = computed(() => {
  const wordPressPages = data.value?.map((item: MenuItemFragment) => ({
    label: item.label,
    to: item.uri
  })) ?? []
  return [
    {
      label: 'Home',
      to: '/'
    },
    ...wordPressPages
  ]
})
</script>

<template>
  <div>
    <UHeader>
      <template #left>
        <NuxtLink to="/">
          <AppLogo class="w-auto h-6 shrink-0" /> Starter
        </NuxtLink>
      </template>
      <UNavigationMenu :items="menu" />
      <template #right>
        <UColorModeButton />
        <UButton
          v-if="runtimeConfig.public.wordpressUrl"
          icon="i-simple-icons-wordpress"
          variant="ghost"
          :to="`${runtimeConfig.public.wordpressUrl}/wp-admin`"
        />
        <UButton
          to="https://github.com/wpnuxt/wpnuxt-starter"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UHeader>
    <UMain>
      <slot />
    </UMain>
    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          Built with WPNuxt and Nuxt UI • © {{ new Date().getFullYear() }}
        </p>
      </template>
    </UFooter>
  </div>
</template>
