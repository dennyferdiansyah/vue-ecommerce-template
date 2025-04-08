<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type {VNode} from "vue";

defineProps<{
  caption?: string
  columns: {
    key: string
    label: string
    align?: 'right' | 'left' | 'center'
    render?: (row: Record<string, any>) => VNode
  }[]
  rows?: Record<string, any>[]
}>()
</script>

<template>
  <Table>
    <TableCaption v-if="caption">{{ caption }}</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead
            v-for="col in columns"
            :key="col.key"
            :class="{
            'text-right': col.align === 'right',
            'text-center': col.align === 'center',
          }"
        >
          {{ col.label }}
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="(row, rowIndex) in rows" :key="rowIndex">
        <TableCell
            v-for="col in columns"
            :key="col.key"
            :class="{
            'text-right': col.align === 'right',
            'text-center': col.align === 'center',
          }"
        >
          <component
              :is="col.render ? col.render(row) : null"
              v-if="col.render"
          />
          <template v-else>
            {{ row[col.key] }}
          </template>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
