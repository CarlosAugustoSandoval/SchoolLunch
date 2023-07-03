<template>
  <q-table
    :rows="rows"
    :columns="columns"
    row-key="id"
  >
    <template v-slot:body-cell-receipt="{row}">
      <q-td class="text-center">
        <q-btn round color="primary" @click="row.id">
          <q-icon name="receipt" />
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
    name: 'products',
    required: true,
    label: 'Productos',
    align: 'center',
    field: 'products',
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
    label: 'Recibo',
    align: 'center',
    field: 'receipt'
  }
]
const rows = [
  {
    id: 1,
    date: 'Lunes, 20 de marzo a las 09:30AM',
    products: 3,
    amount: '4500'
  },
  {
    id: 2,
    date: 'Martes, 14 de abril a las 09:12AM',
    products: 2,
    amount: '3500'
  },
  {
    id: 3,
    date: 'Miercoles, 15 de abril a las 09:40AM',
    products: 4,
    amount: '5100'
  }
]
</script>
