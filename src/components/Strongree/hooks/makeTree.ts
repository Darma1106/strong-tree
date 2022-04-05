import type { ISetting, JQuery, IzTreeObj, IzTree } from '../types'
import $ from 'jquery'
import { onUnmounted } from 'vue-demi'

interface TreeCtl<T> {
  loadData: (data: T) => void
  getInstance: () => IzTreeObj
}

interface TreeState {
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
  let treeInstance: IzTreeObj | null = null
  onUnmounted(() => {
    if (!treeInstance) {
      return
    }
    treeInstance.destroy()
  })

  const loadData = (data: T) => {
    if (!zTree) {
      return
    }

    // 更新树的数据进行渲染
    treeInstance = zTree.init($(`#${treeId}`), optioin, data)
  }

  const getInstance = () => treeInstance ?? ({} as IzTreeObj)

  return [{ treeId }, { loadData, getInstance }]
}
