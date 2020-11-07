<template>
    <b-overlay
        :show="showOverlay"
        rounded="sm"
        no-wrap
        :opacity="1"
        no-fade
        z-index="10000"
    >
        <template #overlay>
            <div class="overlay">
                <AuthLogo v-if="showLogo" />
                <span class="overlay__text"
                    >{{ text }}
                    <b-spinner
                        label="Spinning"
                        variant="primary"
                        small
                        class="ml-2"
                    ></b-spinner
                ></span>
            </div>
        </template>
    </b-overlay>
</template>

<script>
import AuthLogo from '@/components/AuthLogo'
export default {
    name: 'LoadingOverlay',
    components: { AuthLogo },
    props: {
        showOverlay: {
            type: Boolean,
            default: true,
        },
        showLogo: {
            type: Boolean,
            default: true,
        },
        text: {
            type: String,
            default: 'Загрузка данных профиля',
        },
    },
}
</script>

<style lang="scss" scoped>
.overlay {
    min-width: 300px;
}
</style>
