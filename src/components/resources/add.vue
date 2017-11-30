<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results">
					<resource-form-add></resource-form-add>
				</section>
			</main>
		</div>
	</div>	
</template>

<script>
import navbar from '@/components/common/navbar';
import resourceFormAdd from '@/components/resources/form-add';

export default {
	name: 'resource-add',
	components: {
		navbar,
		resourceFormAdd
	}
}
</script>
