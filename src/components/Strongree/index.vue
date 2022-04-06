<template>
  <div :id="treeId" class="ztree"></div>
</template>

<script setup lang="ts">
import type { ISetting, ITreeNode } from './types'
import { useMakeTree } from './hooks/makeTree'
import { watch, onMounted } from 'vue-demi'
import { useTreeActions } from './hooks/treeActions'
interface Props {
  // 树的数据，可为树形结构或者为变平的关系数据
  data: any[]
  option?: ISetting
}
const props = withDefaults(defineProps<Props>(), {
  option: () => ({})
})
const emits = defineEmits(['node-check', 'node-click', 'collapse', 'expand', 'db-click', 'node-change'])
const DEFUALT_OPTION: ISetting = {
  view: {
    showIcon: false // 默认不显示图标
  },
  callback: {
    onCheck: (event: Event, treeId: string, treeNode: ITreeNode) => {
      emits('node-check', treeNode)
    },
    onClick: (event: Event, treeId: string, treeNode: ITreeNode, clickFlag: number) => {
      selectNode?.(treeNode)
      emits('node-click', event, treeId, treeNode)
    },
    onCollapse: (...arg: any[]) => {
      emits('collapse', ...arg)
    },
    onDblClick: (...arg: any[]) => {
      emits('db-click', ...arg)
    },
    onExpand: (...arg: any[]) => {
      emits('expand', ...arg)
    }
  }
}
const [{ treeId, treeInstance }, { loadData, getInstance }] = useMakeTree({ ...DEFUALT_OPTION, ...props.option })
const [{ currentNode }, { selectRoot, selectByProperty, selectNode, setCheckDisabled }] = useTreeActions(treeInstance)
watch(
  () => currentNode!.value,
  (val) => {
    emits('node-change', val)
  }
)
watch(
  () => props.data,
  (val) => {
    loadData(val)
  }
)

onMounted(() => {
  console.log('123', loadData)

  loadData(props.data)
})
defineExpose({ treeInstance, getInstance, selectRoot, selectByProperty, selectNode, setCheckDisabled })
</script>

<style lang="less" scoped>
.ztree {
  text-align: left;
  font-size: 14px;
  /deep/ li {
    list-style-type: none;
    white-space: nowrap;
    outline: none;
    ul {
      position: relative;
      padding: 0 0 0 20px;
      margin: 0;
    }

    a {
      display: inline-block;
      line-height: 22px;
      height: 22px;
      margin: 0;
      cursor: pointer;
      transition: none;
      vertical-align: middle;
      color: #555555;
    }
  }
  .line {
    &::before {
      position: absolute;
      top: 0;
      left: 10px;
      height: 100%;
      content: '';
      border-right: 1px dotted #dbdbdb;
    }
  }

  .mixinA {
    position: absolute;
    content: '';
    border: 0 dotted #dbdbdb;
  }

  .roots_docu:before,
  .roots_docu:after,
  .center_docu:before,
  .bottom_docu:before,
  .center_docu:after,
  .bottom_docu:after {
    .mixinA();
  }

  .roots_docu {
    &::before {
      left: 10px;
      height: 50%;
      top: 50%;
      border-left-width: 1px;
    }
    &::after {
      top: 50%;
      left: 11px;
      width: 50%;
      border-top-width: 1px;
    }
  }

  .center_docu {
    &::before {
      left: 10px;
      height: 100%;
      border-left-width: 1px;
    }
    &::after {
      top: 50%;
      left: 11px;
      width: 50%;
      border-top-width: 1px;
    }
  }

  .bottom_docu {
    &::before {
      left: 10px;
      height: 50%;
      border-left-width: 1px;
    }
    &::after {
      top: 50%;
      left: 11px;
      width: 50%;
      border-top-width: 1px;
    }
  }

  .node_name {
    display: inline-block;
    padding: 0 3px;
    border-radius: 4px;
  }

  .curSelectedNode {
    .node_name {
      color: #000;
      background-color: #c9e9f7;
    }
  }

  .curSelectedNode_Edit {
    height: 20px;
    opacity: 0.8;
    color: #000;
    border: 1px #6cc2e8 solid;
    background-color: #9dd6f0;
  }

  .tmpTargetNode_inner {
    opacity: 0.8;
    color: #fff;
    background-color: #4fcbf0;
    filter: alpha(opacity=80);
  }
  .rename {
    font-size: 12px;
    line-height: 22px;
    width: 80px;
    height: 22px;
    margin: 0;
    padding: 0;
    vertical-align: top;
    border: 0;
    background: none;
  }
  /deep/ .button {
    position: relative;
    display: inline-block;
    line-height: 22px;
    height: 22px;
    width: 22px;
    cursor: pointer;
    text-align: center;
    vertical-align: middle;

    &.edit {
      color: #25ae88;
    }

    &.remove {
      color: #cb4042;
    }

    &.chk {
      position: relative;
      width: 14px;
      height: 14px;
      margin: 0 4px 0 0;
      border: 1px solid #d7dde4;
      border-radius: 2px;
      background: #fff;

      &::after {
        position: absolute;
        top: 1px;
        left: 4px;
        width: 4px;
        height: 8px;
        content: '';
        transition: -webkit-transform 0.2s ease-in-out;
        transition: transform 0.2s ease-in-out;
        transition: transform 0.2s ease-in-out, -webkit-transform 0.2s ease-in-out;
        -webkit-transform: rotate(0deg) scale(0);
        transform: rotate(0deg) scale(0);
        border-right: 2px solid #fff;
        border-bottom: 2px solid #fff;
      }

      .radio_true_full,
      .radio_false_full,
      .radio_true_full_focus,
      .radio_false_full_focus .radio_false_disable,
      .radio_true_disable,
      .radio_true_part,
      .radio_false_part,
      .radio_true_part_focus,
      .radio_false_part_focus {
        border-radius: 8px;
      }
    }

    &.checkbox_false_full_focus {
      border-color: #ccc;
    }
  }
}
</style>
<style scoped>
.ztree >>> .button.checkbox_true_full,
.ztree >>> .button.checkbox_true_full_focus,
.ztree >>> .button.checkbox_true_part,
.ztree >>> .button.checkbox_true_part_focus {
  border-color: #39f;
  background-color: #39f;
}

.ztree >>> .button.checkbox_true_disable {
  border-color: #ddd;
  background-color: #ddd;
}
.ztree >>> .button.checkbox_true_full:after,
.ztree >>> .button.checkbox_true_full_focus:after,
.ztree >>> .button.checkbox_true_disable:after,
.ztree >>> .button.checkbox_true_part:after,
.ztree >>> .button.checkbox_true_part_focus:after {
  -webkit-transform: rotate(45deg) scale(1);
  transform: rotate(45deg) scale(1);
}
/* .ztree >>> .button.checkbox_true_part:after,
.ztree >>> .button.checkbox_true_part_focus:after {
  top: 5px;
  left: 2px;
  width: 10px;
  height: 1px;
  -webkit-transform: rotate(0deg) scale(1);
  transform: rotate(0deg) scale(1);
  border-right: 0;
} */
.ztree >>> .button.radio_true_full,
.ztree >>> .chk.radio_true_full_focus,
.ztree >>> .chk.radio_true_part,
.ztree >>> .chk.radio_true_part_focus {
  border-color: #39f;
}
.ztree >>> .button.radio_true_full:after,
.ztree >>> .chk.radio_true_full_focus:after,
.ztree >>> .chk.radio_true_part:after,
.ztree >>> .chk.radio_true_part_focus:after {
  top: 3px;
  left: 3px;
  width: 8px;
  -webkit-transform: rotate(0deg) scale(1);
  transform: rotate(0deg) scale(1);
  border: 0;
  border-radius: 4px;
  background: #39f;
}
.ztree >>> .button.checkbox_true_disable,
.ztree >>> .button.checkbox_false_disable,
.ztree >>> .chk.radio_false_disable,
.ztree >>> .chk.radio_true_disable {
  cursor: not-allowed;
}
.ztree >>> .button.checkbox_false_disable {
  background-color: #f3f3f3;
}
.ztree >>> .button.noline_close:before,
.ztree >>> .button.noline_open:before,
.ztree >>> .button.root_open:before,
.ztree >>> .button.root_close:before,
.ztree >>> .button.roots_open:before,
.ztree >>> .button.roots_close:before,
.ztree >>> .button.bottom_open:before,
.ztree >>> .button.bottom_close:before,
.ztree >>> .button.center_open:before,
.ztree >>> .button.center_close:before {
  position: absolute;
  top: 5px;
  left: 5px;
  content: '';
  transition: -webkit-transform ease 0.3s;
  transition: transform ease 0.3s;
  transition: transform ease 0.3s, -webkit-transform ease 0.3s;
  -webkit-transform: rotateZ(0deg);
  transform: rotateZ(0deg);
  -webkit-transform-origin: 25% 50%;
  transform-origin: 25% 50%;
  border: 6px solid;
  border-color: transparent transparent transparent #666;
}
.ztree >>> .button.noline_open:before,
.ztree >>> .button.root_open:before,
.ztree >>> .button.roots_open:before,
.ztree >>> .button.bottom_open:before,
.ztree >>> .button.center_open:before {
  -webkit-transform: rotateZ(90deg);
  transform: rotateZ(90deg);
}
.ztree >>> .button.ico_loading {
  margin-right: 2px;
  background: url('data:image/gif;base64,R0lGODlhEAAQAKIGAMLY8YSx5HOm4Mjc88/g9Ofw+v///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAGACwAAAAAEAAQAAADMGi6RbUwGjKIXCAA016PgRBElAVlG/RdLOO0X9nK61W39qvqiwz5Ls/rRqrggsdkAgAh+QQFCgAGACwCAAAABwAFAAADD2hqELAmiFBIYY4MAutdCQAh+QQFCgAGACwGAAAABwAFAAADD1hU1kaDOKMYCGAGEeYFCQAh+QQFCgAGACwKAAIABQAHAAADEFhUZjSkKdZqBQG0IELDQAIAIfkEBQoABgAsCgAGAAUABwAAAxBoVlRKgyjmlAIBqCDCzUoCACH5BAUKAAYALAYACgAHAAUAAAMPaGpFtYYMAgJgLogA610JACH5BAUKAAYALAIACgAHAAUAAAMPCAHWFiI4o1ghZZJB5i0JACH5BAUKAAYALAAABgAFAAcAAAMQCAFmIaEp1motpDQySMNFAgA7')
    0 center no-repeat;
}
.ztree >>> .tmpTargetzTree {
  opacity: 0.8;
  background-color: #2ea9df;
  filter: alpha(opacity=80);
}
.ztree >>> .tmpzTreeMove_arrow {
  position: absolute;
  width: 18px;
  height: 18px;
  color: #4fcbf0;
}
</style>
<style>
ul.ztree.zTreeDragUL {
  margin: 0;
  padding: 0;
  position: absolute;
  overflow: hidden;
  background-color: #dedede;
  border: 1px #4fcbf0 dotted;
  border-radius: 4px;
  opacity: 0.7;
}
.zTreeMask {
  position: absolute;
  z-index: 10000;
  opacity: 0;
  background-color: #cfcfcf;
}
</style>
