<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const route = useRoute()

const breadcrumbs = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  const crumbs = []

  let path = ''
  for (let i = 0; i < segments.length; i++) {
    path += '/' + segments[i]

    // Convert slug-like string to human readable
    const name = decodeURIComponent(segments[i])
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())

    crumbs.push({
      name,
      href: i === segments.length - 1 ? null : path,
      isLast: i === segments.length - 1
    })
  }

  return crumbs
})
</script>

<template>
  <Breadcrumb class="mb-4">
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>

      <template v-for="(crumb, index) in breadcrumbs" :key="index">
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <template v-if="!crumb.isLast">
            <BreadcrumbLink :href="crumb.href">{{ crumb.name }}</BreadcrumbLink>
          </template>
          <template v-else>
            <BreadcrumbPage>{{ crumb.name }}</BreadcrumbPage>
          </template>
        </BreadcrumbItem>
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
