<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="cursor-pointer h-10 hover:bg-neutral-600 rounded-full pl-1 pr-3 flex items-center transition duration-200 whitespace-nowrap overflow-hidden ellipsis content-end align-right justify-end max-w-42 gap-2">
      <Avatar class="w-8 h-8 bg-accent-light">
        <AvatarFallback class=" bg-accent">DF</AvatarFallback>
      </Avatar>
      <span class="text-xs font-semibold whitespace-nowrap text-ellipsis overflow-hidden text-left block w-auto">Sign In / Register</span>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="bg-neutral-800 text-white border-0">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Billing</DropdownMenuItem>
      <DropdownMenuItem>Team</DropdownMenuItem>
      <DropdownMenuItem>Subscription</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
</script>