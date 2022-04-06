import { isNull } from 'lodash-es';
import { computed, ref, watch } from 'vue-demi';
import type { Ref } from 'vue-demi';
import type { IzTreeObj } from '../types';
/**
 *
 * @param getTreeInsance 获取树instance
 */
export const useTreeActions = (treeInstance: Ref<IzTreeObj | null>) => {
    // 当前选中节点
    const currentNode = ref<any>();

    // 选中某个节点

    const selectNode = (node: any) => {
        if (isNull(treeInstance.value)) {
            return;
        }
        treeInstance.value.selectNode(node);
        currentNode.value = node;
    };

    const selectByProperty = (propertyName: string, value: any) => {
        selectNode(treeInstance.value?.getNodeByParam(propertyName, value));
    };

    // 选中根节点
    const selectRoot = () => {
        if (isNull(treeInstance.value)) {
            return;
        }
        const nodes = treeInstance.value.getNodes();
        if (nodes.length > 0) {
            selectNode(nodes[0]);
            treeInstance.value.expandNode(nodes[0]);
        }
    };
    // 勾选节点

    const setCheckDisabled = (node: any, disabled: boolean, inheritParent: boolean, inheritChildren: boolean) => {
        treeInstance.value?.setChkDisabled(node, disabled, inheritParent, inheritChildren);
    };

    return [{ currentNode }, { selectRoot, selectByProperty, selectNode, setCheckDisabled }];
};
