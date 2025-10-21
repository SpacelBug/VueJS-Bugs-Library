<template>
    <div class="components">

    </div>
</template>

<script>
export default {
    name: 'SpecialSection',
};
</script>

<style scoped>
.components {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-left: 16px;
}

.side-link {
    color: white;
    text-decoration: none;
}

.router-link-active {
    color: var(--accent-color)
}
</style>