<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results">
					<employee-form-add></employee-form-add>
				</section>
			</main>
		</div>
	</div>	
</template>

<script>
import navbar from '@/components/common/navbar';
import employeeFormAdd from '@/components/employees/form-add';

export default {
	name: 'employee-add',
	components: {
		navbar,
		employeeFormAdd
	}
}
</script>
