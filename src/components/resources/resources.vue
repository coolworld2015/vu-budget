<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results">
					<resources-header></resources-header> 
					<resources-items></resources-items>
				</section>
				<resources-footer></resources-footer> 
			</main>
		</div>

	</div>
</template>

<script>
import appConfig from '../../main';
import navbar from '@/components/common/navbar';
import resourcesHeader from '@/components/resources/header';
import resourcesItems from '@/components/resources/items';
import resourcesFooter from '@/components/resources/footer';

export default {
  name: 'resources',
  data () {
    return {
      route: 'Resources'
    }
  },
	created() {
		if (!appConfig.access_token) {
			this.$router.push('/login');
		} 	
		appConfig.route = this.route;			
	},
	components: {
		navbar,
		resourcesHeader,
		resourcesItems,
		resourcesFooter
	}
}
</script>
