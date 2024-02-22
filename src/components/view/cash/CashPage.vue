<template>
    <v-app>
        <v-tooltip text="Tooltip">
            <template v-slot:activator="{ props }">
        <v-btn v-bind="props">Tooltip</v-btn>
    </template>
    </v-tooltip>
    </v-app>
</template>

<script>

export default{
}
</script>