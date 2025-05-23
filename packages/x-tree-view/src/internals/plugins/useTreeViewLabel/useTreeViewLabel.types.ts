import { DefaultizedProps } from '@mui/x-internals/types';
import { TreeViewPluginSignature } from '../../models';
import { TreeViewItemId } from '../../../models';
import { UseTreeViewItemsSignature } from '../useTreeViewItems';
import { TreeItemLabelInputProps } from '../../../TreeItemLabelInput';

export interface UseTreeViewLabelPublicAPI {
  /**
   * Used to update the label of an item.
   * @param {TreeViewItemId} itemId The id of the item to update the label of.
   * @param {string} newLabel The new label of the item.
   */
  updateItemLabel: (itemId: TreeViewItemId, newLabel: string) => void;
  /**
   * Set which item is currently being edited.
   * You can pass `null` to exit editing mode.
   * @param {TreeViewItemId | null} itemId The id of the item to edit, or `null` to exit editing mode.
   */
  setEditedItem: (itemId: TreeViewItemId | null) => void;
}

export interface UseTreeViewLabelInstance extends UseTreeViewLabelPublicAPI {}

export interface UseTreeViewLabelParameters<R extends {}> {
  /**
   * Callback fired when the label of an item changes.
   * @param {TreeViewItemId} itemId The id of the item that was edited.
   * @param {string} newLabel The new label of the items.
   */
  onItemLabelChange?: (itemId: TreeViewItemId, newLabel: string) => void;
  /**
   * Determine if a given item can be edited.
   * @template R
   * @param {R} item The item to check.
   * @returns {boolean} `true` if the item can be edited.
   * @default () => false
   */
  isItemEditable?: boolean | ((item: R) => boolean);
}

export type UseTreeViewLabelParametersWithDefaults<R extends {}> = DefaultizedProps<
  UseTreeViewLabelParameters<R>,
  'isItemEditable'
>;

export interface UseTreeViewLabelState {
  label: {
    isItemEditable: ((item: any) => boolean) | boolean;
    editedItemId: string | null;
  };
}

export type UseTreeViewLabelSignature = TreeViewPluginSignature<{
  params: UseTreeViewLabelParameters<any>;
  paramsWithDefaults: UseTreeViewLabelParametersWithDefaults<any>;
  publicAPI: UseTreeViewLabelPublicAPI;
  instance: UseTreeViewLabelInstance;
  state: UseTreeViewLabelState;
  dependencies: [UseTreeViewItemsSignature];
}>;

export interface UseTreeItemLabelInputSlotPropsFromLabelEditing extends TreeItemLabelInputProps {}

export interface UseTreeItemLabelSlotPropsFromLabelEditing {
  editable?: boolean;
}

declare module '@mui/x-tree-view/useTreeItem' {
  interface UseTreeItemLabelInputSlotOwnProps
    extends UseTreeItemLabelInputSlotPropsFromLabelEditing {}

  interface UseTreeItemLabelSlotOwnProps extends UseTreeItemLabelSlotPropsFromLabelEditing {}
}
