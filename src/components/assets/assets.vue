<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results">
					<assets-header></assets-header> 
					<assets-items></assets-items>
				</section>
				<assets-footer></assets-footer> 
			</main>
		</div>

	</div>
</template>

<script>
import appConfig from '../../main';
import navbar from '@/components/common/navbar';
import assetsHeader from '@/components/assets/header';
import assetsItems from '@/components/assets/items';
import assetsFooter from '@/components/assets/footer';

export default {
  name: 'assets',
  data () {
    return {
      route: 'Assets'
    }
  },
	created() {
		appConfig.getAccessToken();
		if (appConfig.access_token == 'login') {
			this.$router.push('login');
		}
		
		appConfig.route = this.route;			
	},
	components: {
		navbar,
		assetsHeader,
		assetsItems,
		assetsFooter
	}
}
</script>
