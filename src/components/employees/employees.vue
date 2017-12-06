<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results">
					<employees-header></employees-header> 
					<employees-items></employees-items>
				</section>
				<employees-footer></employees-footer> 
			</main>
		</div>

	</div>
</template>

<script>
import appConfig from '../../main';
import navbar from '@/components/common/navbar';
import employeesHeader from '@/components/employees/header';
import employeesItems from '@/components/employees/items';
import employeesFooter from '@/components/employees/footer';

export default {
  name: 'projects',
  data () {
    return {
      route: 'Employees'
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
		employeesHeader,
		employeesItems,
		employeesFooter
	}
}
</script>
