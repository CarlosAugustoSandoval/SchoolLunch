<template>
  <q-page :class="`row q-col-gutter-md q-pa-${$q.screen.sm ? 'sm' : 'lg'}`">
    <div class="col-12 col-sm-5 col-md-4">
      <q-card>
        <q-card-section class="text-center">
          <q-avatar size="100px" class="shadow-10">
            <img src="/src/assets/SantiProfile.jpg">
          </q-avatar>
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          <div class="text-h6">
            Carlos Santiago Sandoval Sánchez
          </div>
          <div class="text-caption">
            TI1029666179
          </div>
          <q-chip
            text-color="white"
            size="md"
            color="red"
          >
            Estudiante
          </q-chip>
          <q-chip
            text-color="white"
            size="md"
            color="blue"
          >
            Antiguo
          </q-chip>
        </q-card-section>
        <q-card-section>
          <q-list>
            <q-item class="q-pa-none full-width">
              <q-item-section avatar>
                <q-avatar color="orange">
                  <q-icon name="attach_money" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label caption>
                  Saldo disponible
                </q-item-label>
                <q-item-label>
                  $34.000
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="q-pa-none full-width">
              <q-item-section avatar>
                <q-avatar color="blue">
                  <q-icon name="email" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label caption>
                  Correo electrónico
                </q-item-label>
                <q-item-label>
                  <a href="mailto:sandovalcarlossantiago@gmail.com">sandovalcarlossantiago@gmail.com</a>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="q-pa-none full-width">
              <q-item-section avatar>
                <q-avatar color="green">
                  <q-icon name="phone" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label caption>
                  Teléfono
                </q-item-label>
                <q-item-label>
                  <a href="tel:3222346834">3222346834</a>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="q-pa-none full-width">
              <q-item-section avatar>
                <q-avatar color="red">
                  <q-icon name="bloodtype" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label caption>
                  Tipo de Sangre
                </q-item-label>
                <q-item-label>
                  O+
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn round push icon="edit" color="warning">
            <q-tooltip anchor="top middle" :offset="[0, 30]">
              Editar
            </q-tooltip>
          </q-btn>
          <q-btn round push icon="price_change" color="green">
            <q-tooltip anchor="top middle" :offset="[0, 30]">
              Recargar saldo
            </q-tooltip>
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <div class="col-12 col-sm-7 col-md-8">
      <q-tabs
        v-model="tab"
        align="justify"
        narrow-indicator
        class="q-mb-lg"
      >
        <q-tab class="text-purple" name="tab1" label="Compras" />
        <q-tab class="text-orange" name="tab2" label="Recargas" />
        <q-tab class="text-teal" name="tab3" label="Documentos" />
      </q-tabs>
      <div class="q-gutter-sm">
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="scale"
          transition-next="scale"
        >
          <q-tab-panel name="tab1">
            <purchase-records />
          </q-tab-panel>

          <q-tab-panel name="tab2">
            <card-recharge-records />
          </q-tab-panel>

          <q-tab-panel name="tab3">
            <document-records />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import PurchaseRecords from 'src/modules/members/components/detail/PurchaseRecords.vue'
import CardRechargeRecords from 'src/modules/members/components/detail/CardRechargeRecords.vue'
import DocumentRecords from 'src/modules/members/components/detail/DocumentRecords.vue'

const tab = ref('tab1')
</script>
