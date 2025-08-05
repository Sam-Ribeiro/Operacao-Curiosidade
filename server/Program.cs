using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;
using server.Application.Commands.Interfaces;
using server.Application.Controllers.HandlerContainers;
using server.Application.Features.Interfaces;
using server.Application.Features.Logs.Queries.GetLogs;
using server.Application.Features.Pages.Queries.GetDeletedPersonsPages;
using server.Application.Features.Pages.Queries.GetLogsPages;
using server.Application.Features.Pages.Queries.GetPersonsPages;
using server.Application.Features.Persons.Commands.CreatePerson;
using server.Application.Features.Persons.Commands.DeletePerson;
using server.Application.Features.Persons.Commands.RestorePerson;
using server.Application.Features.Persons.Commands.UpdatePerson;
using server.Application.Features.Persons.Queries.GetDeletedPersons;
using server.Application.Features.Persons.Queries.GetInactiveCount;
using server.Application.Features.Persons.Queries.GetLastMonthRecordCount;
using server.Application.Features.Persons.Queries.GetPersonData;
using server.Application.Features.Persons.Queries.GetPersons;
using server.Application.Features.Persons.Queries.GetPersonsCount;
using server.Application.Features.Users.Commands.CreateUser;
using server.Application.Features.Users.Commands.Login;
using server.Application.Features.Users.Commands.UpdatePassword;
using server.Application.Features.Users.Commands.UpdateUser;
using server.Application.Features.Users.Queries.GetUserProfile;
using server.Infrastructure.Data;
using server.Infrastructure.Repositories;
using server.Infrastructure.Repositories.Interfaces;
using server.Repositories;
using server.Services.Authentication;
using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

ReadToken.Configure(builder.Configuration);

builder.Services.AddScoped<InMemoryContext>();

builder.Services.AddScoped<IReadUserRepository, ReadUserRepository>();
builder.Services.AddScoped<IWriteUserRepository, WriteUserRepository>();
builder.Services.AddScoped<UserServices>();
builder.Services.AddScoped<IHandlerBase<CreateUserCommand>, CreateUserHandler>();
builder.Services.AddScoped<IHandlerBase<LoginCommand>, LoginHandler>();
builder.Services.AddScoped<IHandlerBase<UpdatePasswordCommand>, UpdatePasswordHandler>();
builder.Services.AddScoped<IHandlerBase<UpdateUserCommand>,  UpdateUserHandler>();
builder.Services.AddScoped<IQueryHandler<GetUserProfileQuery>,  GetUserProfileHandler>();
builder.Services.AddScoped<ICreateToken, CreateToken>();

builder.Services.AddScoped<IReadPerson, ReadPersonRepository>();
builder.Services.AddScoped<IWritePerson, WritePersonRepository>();
builder.Services.AddScoped<PersonServices>();
builder.Services.AddScoped<IHandlerBase<CreatePersonCommand>, CreatePersonHandler>();
builder.Services.AddScoped<IHandlerBase<RestorePersonCommand>, RestorePersonHandler>();
builder.Services.AddScoped<IHandlerBase<UpdatePersonCommand>, UpdatePersonHandler>();
builder.Services.AddScoped<IHandlerBase<DeletePersonCommand>, DeletePersonHandler>();
builder.Services.AddScoped<IQueryHandler<GetPersonsQuery>, GetPersonsHandler>();
builder.Services.AddScoped<IQueryHandler<GetPersonDataQuery>, GetPersonDataHandler>();
builder.Services.AddScoped<IQueryHandler<GetDeletedPersonsQuery>, GetDeletedPersonsHandler>();
builder.Services.AddScoped<IQueryHandler<GetInactiveCountQuery>, GetInactiveCountHandler>();
builder.Services.AddScoped<IQueryHandler<GetPersonsCountQuery>, GetPersonsCountHandler>();
builder.Services.AddScoped<IQueryHandler<GetMonthRecordCountQuery>, GetMonthRecordCountHandler>();

builder.Services.AddScoped<LogServices>();
builder.Services.AddScoped<IQueryHandler<GetLogsQuery>, GetLogsHandler>();

builder.Services.AddScoped<PageContentServices>();
builder.Services.AddScoped<IQueryHandler<GetPersonsPagesQuery>, GetPersonsPagesHandler>();
builder.Services.AddScoped<IQueryHandler<GetLogsPagesQuery>, GetLogsPagesHandler>();
builder.Services.AddScoped<IQueryHandler<GetDeletedPersonsPagesQuery>, GetDeletedPersonsPagesHandler>();

builder.Services.AddCors(options =>
{
options.AddPolicy("AllowAll", builder =>
    builder.AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => {
    options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, 
        new OpenApiSecurityScheme
        {
            Name = "Authorization",
            Description = "Enter the token",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer"
        });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme{
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = JwtBearerDefaults.AuthenticationScheme
                }
            }, new string[]{ }
        }
    });
});

builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.AddPolicy("fixed", HttpContext =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: HttpContext.Connection.RemoteIpAddress?.ToString(),
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 10,
                Window = TimeSpan.FromSeconds(60)
            }
        )
    );
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseRateLimiter();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();