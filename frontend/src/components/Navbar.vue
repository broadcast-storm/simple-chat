<template>
    <div>
        <b-navbar type="dark" variant="dark" fixed="top">
            <b-container fluid="lg">
                <b-navbar-brand><NavbarLogo /></b-navbar-brand>

                <b-navbar-nav class="ml-auto">
                    <UserPhoto />
                </b-navbar-nav>
            </b-container>
        </b-navbar>
    </div>
</template>

<script>
import NavbarLogo from '@/components/Navbar/NavbarLogo'
import UserPhoto from '@/components/Navbar/UserPhoto'
export default {
    name: 'Navbar',
    components: { NavbarLogo, UserPhoto },
}
</script>

<style lang="scss" scoped></style>
