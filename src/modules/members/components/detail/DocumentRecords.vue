<template>
  <q-list>
    <q-item clickable v-ripple>
      <q-item-section avatar top>
        <q-avatar icon="contact_page" color="grey" text-color="white" />
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1">Documento de identidad</q-item-label>
        <q-item-label caption>Enero 23, 2023</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon color="info" name="info" />
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section avatar top>
        <q-avatar icon="verified_user" color="grey" text-color="white" />
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1">Comprobantes de matrícula</q-item-label>
        <q-item-label caption>Enero 29, 2023</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon name="info" color="info" />
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section avatar top>
        <q-avatar icon="description" color="grey" text-color="white" />
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1">Certificación de estudio</q-item-label>
        <q-item-label caption>Mayo 02, 2023</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon name="info" color="info" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts" setup>
</script>
