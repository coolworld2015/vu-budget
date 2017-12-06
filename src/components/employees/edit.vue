<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results">
					<employee-form-edit></employee-form-edit>
				</section>
			</main>
		</div>
	</div>	
</template>

<script>
import navbar from '@/components/common/navbar';
import employeeFormEdit from '@/components/employees/form-edit';

export default {
	name: 'employee-edit',
	components: {
		navbar,
		employeeFormEdit
	}
}
</script>
