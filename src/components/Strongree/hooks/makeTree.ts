import type { ISetting, JQuery, IzTreeObj, IzTree } from '../types'
import type { Ref } from 'vue-demi'
import $ from 'jquery'
import { ref, onUnmounted } from 'vue-demi'

import '../resource/index.js'
interface TreeCtl<T> {
  loadData: (data: T[]) => void
  getInstance: () => Ref<IzTreeObj | null>
}

interface TreeState {
  treeInstance: Ref<IzTreeObj | null>
  treeId: string
}

export const useMakeTree = <T>(optioin: ISetting = {}): [TreeState, TreeCtl<T>] => {
  if (!(window as any).jQuery) {
    ;(window as any).jQuery = $
  }
  // 延迟注入ztree，防止jQuery不存在导致内部错误

  const zTree: IzTree<T> = ($ as unknown as JQuery).fn.zTree

  // 树id
  const treeId = `strongree-${Math.floor(Math.random() * 100000)}`

  // 树实例
  const treeInstance: Ref<IzTreeObj | null> = ref(null)

  // onMounted(() => {
  //     loadData();
  // });
  onUnmounted(() => {
    if (!treeInstance.value) {
      return
    }
    treeInstance.value.destroy()
  })

  const loadData = (data: T[] = []) => {
    console.log(zTree, 'zTree')

    if (!zTree) {
      return
    }

    // 更新树的数据进行渲染
    treeInstance.value = zTree.init($(`#${treeId}`), optioin, data)
  }

  const getInstance = () => treeInstance

  return [
    { treeId, treeInstance },
    { loadData, getInstance }
  ]
}
