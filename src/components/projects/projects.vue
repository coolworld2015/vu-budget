<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results">
					<projects-header></projects-header> 
					<projects-items></projects-items>
				</section>
				<projects-footer></projects-footer> 
			</main>
		</div>

	</div>
</template>

<script>
import appConfig from '../../main';
import navbar from '@/components/common/navbar';
import projectsHeader from '@/components/projects/header';
import projectsItems from '@/components/projects/items';
import projectsFooter from '@/components/projects/footer';

export default {
  name: 'projects',
  data () {
    return {
      route: 'Projects'
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
		projectsHeader,
		projectsItems,
		projectsFooter
	}
}
</script>
