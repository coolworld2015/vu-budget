<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results">
					<department-form-add></department-form-add>
				</section>
			</main>
		</div>
	</div>	
</template>

<script>
import navbar from '@/components/common/navbar';
import departmentFormAdd from '@/components/departments/form-add';

export default {
	name: 'department-add',
	components: {
		navbar,
		departmentFormAdd
	}
}
</script>
