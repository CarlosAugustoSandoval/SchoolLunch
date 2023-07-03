<template>
  <q-table
    :rows="rows"
    :columns="columns"
    row-key="id"
  >
    <template v-slot:body-cell-receipt="{row}">
      <q-td class="text-center">
        <q-btn round color="primary" @click="row.id">
          <q-icon name="request_quote" />
        </q-btn>
      </q-td>
    </template>
  </q-table>
</template>

<script lang="ts" setup>
const columns = [
  {
    name: 'date',
    required: true,
    label: 'Fecha',
    align: 'left',
    field: 'date',
    sortable: true
  },
  {
    name: 'type',
    required: true,
    label: 'Tipo',
    align: 'left',
    field: 'type',
    sortable: true
  },
  {
    name: 'amount',
    required: true,
    label: 'Valor',
    align: 'right',
    field: 'amount',
    format: (val: any) => `$${val}`,
    sortable: true
  },
  {
    name: 'receipt',
    required: true,
    label: 'Comprobante',
    align: 'center',
    field: 'receipt'
  }
]
const rows = [
  {
    id: 1,
    date: 'Lunes, 20 de marzo a las 09:30AM',
    type: 'Manual - Transferencia',
    amount: '2000'
  },
  {
    id: 2,
    date: 'Martes, 14 de abril a las 09:12AM',
    type: 'Automático - Transferencia',
    amount: '50000'
  },
  {
    id: 3,
    date: 'Miercoles, 15 de abril a las 09:40AM',
    type: 'Manual - Efectivo',
    amount: '30000'
  }
]
</script>
