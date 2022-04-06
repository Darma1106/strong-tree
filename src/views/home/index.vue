<template>
  <strong-tree ref="StrongTreeRef"
                         :data="nodes"
                         :option="setting"
                         @node-change="handleNodeChange"
                         @node-check="handleNodeCheck" />
</template>

<script setup lang="ts">
import { ref } from 'vue-demi'
import StrongTree from '@/components/Strongree/index.vue'

const nodes = ref<any[]>([]);
const setting: any = {
    check: {
        enable: true,
        chkboxType: { Y: 's', N: 's' },
    },
    data: {
        key: {
            name: 'text',
        },
        simpleData: {
            enable: true,
            idKey: 'id',
        },
    },
    view: {
        showIcon: false,
    },
};

const StrongTreeRef = ref(null as Nullable<StrongTreeInstance>);

const grpId = ref();

const handleNodeChange = (node: GetAssocUser_GridData)=>{
    console.log('node', node.id);
    grpId.value = node.id;
};

const handleNodeCheck = (node: any)=>{
    const instance = StrongTreeRef.value?.getInstance();
    const nodes = instance?.value.getNodesByParam('b_inherit_prole', 1, node);
    console.log('nodes', nodes);
    nodes.forEach(node => {
        StrongTreeRef.value.setCheckDisabled(node, true, false, false);
    });
    // StrongTreeRef.value.setCheckDisabled(nodes, true, false, true);
    // StrongTreeRef.value.setCheckDisabled(node, false, false, false);

};
</script>

<style lang="less" scope></style>
