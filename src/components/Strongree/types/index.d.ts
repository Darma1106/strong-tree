import type { Ref } from 'vue-demi';
export interface StrongTreeInstance {
    // 选择根节点
    selectRoot: () => void;
    // 获取实例对象
    getInstance: () => Ref<IzTreeObj>;
}

export interface JQuery {
    fn: {
        zTree: IzTree;
    };
}

export interface IJSON {
    [key: string]: any;
}

export interface ITreeNode {
    checked?: boolean;
    children?: Array<ITreeNode>;
    chkDisabled?: boolean;
    click?: CallBackOnFn;
    getCheckStatus?: () => object;
    getIndex?: () => number;
    getNextNode?: () => ITreeNode;
    getParentNode?: () => ITreeNode;
    getPath?: () => Array<ITreeNode>;
    getPrevNode?: () => ITreeNode;
    halfCheck?: boolean;
    icon?: string;
    iconClose?: string;
    iconOpen?: string;
    iconSkin?: string;
    isHidden?: boolean;
    isParent?: boolean;
    name?: string;
    nocheck?: boolean;
    open?: boolean;
    target?: string;
    url?: string;
    check_Child_State?: number;
    check_Focus?: boolean;
    checkedOld?: boolean;
    editNameFlag?: boolean;
    isAjaxing?: boolean;
    isFirstNode?: boolean;
    isHover?: boolean;
    isLastNode?: boolean;
    level?: number;
    parentTId?: string;
    tId?: string;
    [key: string]: any;
}

export type ApplicationType = 'application/json' | 'application/x-www-form-urlencoded';
export type AjaxType = 'get' | 'post';
export type DataType = 'html' | 'json' | 'jsonp' | 'script' | 'text' | 'xml';

/**
 * Defines a class to be returned by the zTree view.nodeClasses function
 */
export interface INodeClasses {
    add: string[];
    remove: string[];
}

export interface IAsync {
    autoParam?: string[];
    contentType?: ApplicationType;
    dataFilter?: (treeId: string, parentNode: ITreeNode, responseData: IJSON | IJSON[] | string) => IJSON | IJSON[];
    dataType?: DataType;
    enable?: boolean;
    otherParam?: IJSON | string[];
    type?: AjaxType;
    headers?: object;
    xhrFields?: object;
 