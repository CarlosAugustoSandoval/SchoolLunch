<template>
  <q-td style="padding-bottom: 42px">
    <div class="optionsButtons">
      <q-inner-loading v-if="props.loading" style="background-color: transparent;" size="md" :showing="props.loading" />
      <div v-else class="options">
        <q-btn push round dense color="warning" icon="edit" @click="$emit('edit')">
          <q-tooltip :anchor="`${props.tooltipVertical} ${props.tooltipHorizontal}`">Editar</q-tooltip>
        </q-btn>
      </div>
    </div>
  </q-td>
</template>

<script lang="ts" setup>
import { PropsOptionsButtons } from 'components/optionsButtons/models'

export interface IPropsOptionsButtons {
  editButton?: boolean
  editTooltip?: string
  editColor?: string
  editIcon?: string
  loading?: boolean
  tooltipVertical?: 'top'|'center'|'bottom'
  tooltipHorizontal?: 'left'|'middle'|'right'|'start'|'end'
}
const props = withDefaults(defineProps<IPropsOptionsButtons>(), { ...PropsOptionsButtons })
</script>

<style lang="scss">
.q-table tr .optionsButtons {
  position: fixed !important;
  right: 3rem !important;
  text-align: end;
  .options {
    display: none;
  }
  .loading {
    display: block;
  }
}
.q-table tr:hover .optionsButtons .options {
  display: block;
}
</style>
