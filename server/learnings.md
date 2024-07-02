### [TypeScript type annotation for request.body](https://stackoverflow.com/a/55413670/1844139)
```
router.post('/',(req: Request<{}, {}, PersoneModel>, res: Response) => {
   // req.body is now PersoneModel
}
```

###	[TS2339: Property '' does not exist on type 'Request<ParamsDictionary>'.](https://stackoverflow.com/a/70628704/1844139)
>Error when trying to extend the Request interface from the package express to add some custom properties.

###   node:test or Jest don't support ESM by default, but Vitest does