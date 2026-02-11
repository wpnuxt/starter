<script setup lang="ts">
import type { MenuItemFragment } from '#graphql-operations'

const { data } = await useMenu({ name: 'main' })
const runtimeConfig = useRuntimeConfig()
const { isAuthenticated, user, logout } = useWPAuth()

const menu = computed(() => {
  return data.value?.map((item: MenuItemFragment) => ({
    label: item.label,
    to: item.uri
  }))
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
          color="neutral"
          variant="ghost"
          :to="`${runtimeConfig.public.wordpressUrl}/wp-admin`"
        />
        <UButton
          to="https://github.com/wpnuxt/starter"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />

        <template v-if="isAuthenticated">
          <UUser
            to="/profile"
            :name="user?.name || user?.username"
            :avatar="{ src: user?.avatar?.url, icon: 'i-lucide-user' }"
            size="sm"
          />
          <UButton
            variant="ghost"
            color="error"
            icon="i-lucide-log-out"
            @click="logout"
          />
        </template>
        <UButton
          v-else
          to="/login"
          variant="soft"
        >
          Sign in
        </UButton>
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
