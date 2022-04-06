<template>
  <strong-tree
    ref="strongTreeRef"
    :data="nnodes"
    :option="option"
    @node-change="handleNodeChange"
    @node-check="handleNodeCheck"
  />
</template>

<script setup lang="ts">
import type { StrongTreeInstance } from '@/components/Strongree/types'
import { ref } from 'vue-demi'
import StrongTree from '@/components/Strongree/index.vue'

const nodes = ref([
  { id: 1, pid: 0, name: '随意勾选 1', open: true },
  { id: 11, pid: 1, name: '随意勾选 1-1', open: true },
  { id: 111, pid: 11, name: '随意勾选 1-1-1' },
  { id: 112, pid: 11, name: '随意勾选 1-1-2' },
  { id: 12, pid: 1, name: '随意勾选 1-2', open: true },
  { id: 121, pid: 12, name: '随意勾选 1-2-1' },
  { id: 122, pid: 12, name: '随意勾选 1-2-2' },
  { id: 2, pid: 0, name: '随意勾选 2', checked: true, open: true },
  { id: 21, pid: 2, name: '随意勾选 2-1' },
  { id: 22, pid: 2, name: '随意勾选 2-2', open: true },
  { id: 221, pid: 22, name: '随意勾选 2-2-1', checked: true },
  { id: 222, pid: 22, name: '随意勾选 2-2-2' },
  { id: 23, pid: 2, name: '随意勾选 2-3' }
])

const nnodes = ref([
  {
    name: 'test1',
    open: true,
    children: [
      { name: 'test1_1', flagc: 1 },
      { name: 'test1_2', flagc: 1 }
    ]
  },
  { name: 'test2', open: true, children: [{ name: 'test2_1' }, { name: 'test2_2' }] }
])

const option = {
  check: {
    enable: true,
    chkStyle: 'checkbox',
    chkboxType: { Y: 's', N: 's' }
  },
  view: {
    showIcon: false
  }
}
const strongTreeRef = ref<null | StrongTreeInstance>(null)

const handleNodeChange = (node: any) => {
  console.log('node', node.name)
}
const handleNodeCheck = (node: any) => {
  const instance = strongTreeRef.value?.getInstance()
  const nodes = instance?.value.getNodesByParam('flagc', 1, node) ?? []
  nodes?.forEach((node) => {
    if (!strongTreeRef.value) return
    strongTreeRef.value.setCheckDisabled(node, true, false, false)
  })
}
</script>

<style lang="less" scope></style>
