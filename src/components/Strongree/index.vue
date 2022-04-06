<template>
    <div :id="treeId"
         class="ztree"></div>
</template>

<script setup lang="ts">
import type { ISetting, ITreeNode } from './types';
import { useMakeTree } from './hooks/make_tree';
import { watch } from 'vue-demi';
import { useTreeActions } from './hooks/tree_actions';

interface Props {
    // 树的数据，可为树形结构或者为变平的关系数据
    data: SafeAny[];
    option?: ISetting;
}

const props = withDefaults(defineProps<Props>(), {
    option: () => ({}),
});

const emits = defineEmits(['node-check', 'node-click', 'collapse', 'expand', 'db-click', 'node-change']);

const DEFUALT_OPTION: ISetting = {
    view: {
        showIcon: false, // 默认不显示图标
    },
    callback: {
        onCheck: (event: Event, treeId: string, treeNode: ITreeNode) => {
            emits('node-check', treeNode);
        },
        onClick:(event: Event, treeId: string, treeNode: ITreeNode, clickFlag: number) => {
            selectNode?.(treeNode);

            emits('node-click', event, treeId, treeNode);
        },
        onCollapse: (...arg: any[]) => {
            emits('collapse', ...arg);
        },
        onDblClick: (...arg: any[]) => {
            emits('db-click', ...arg);
        },
        onExpand: (...arg: any[]) => {
            emits('expand', ...arg);
        },
    },
};

const [{ treeId, treeInstance }, { loadData, getInstance }] = useMakeTree({ ...DEFUALT_OPTION, ...props.option });
const [{currentNode}, { selectRoot, selectByProperty, selectNode, setCheckDisabled}] = useTreeActions(treeInstance);

watch(()=>currentNode!.value, val=>{
    emits('node-change', val);
});

watch(
    () => props.data,
    val => {
        loadData(val);
    },
);

defineExpose({ treeInstance, getInstance, selectRoot, selectByProperty, selectNode, setCheckDisabled});
</script>

<style scoped>
/* beauty ztree! */
.ztree {
    text-align: left;
    font-size: 14px;
}
.ztree >>> li {
    list-style-type: none;
    white-spa