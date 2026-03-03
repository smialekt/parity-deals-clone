'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const productDetailsSchema = z.object({
  name: z.string().min(1, 'Required'),
  url: z.url().min(1, 'Required'),
  description: z.string().optional(),
});

export function ProductDetailsForm() {
  const form = useForm<z.infer<typeof productDetailsSchema>>({
    resolver: zodResolver(productDetailsSchema),
    defaultValues: {
      name: '',
      url: '',
      description: '',
    },
  });

  function onSubmit(values: z.infer<typeof productDetailsSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex gap-6 flex-col'
      >
        <div className='grid gap-6 grid-cols-1 lg:grid-cols-2 lg:items-start'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='grow'>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem className='grow'>
                <FormLabel>Enter your website URL</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Include the protocol (http/https) and the full path to the
                  sales page
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='grow'>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea className='min-h-20 resize-none' {...field} />
                </FormControl>
                <FormDescription>
                  An optional description to help distinguish your product from
                  other products
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='self-end'>
          <Button disabled={form.formState.isSubmitting} type='submit'>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
