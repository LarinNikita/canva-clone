ALTER TABLE "project" RENAME TO "projects";--> statement-breakpoint
ALTER TABLE "projects" DROP CONSTRAINT "project_userId_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
