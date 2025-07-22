using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using server.Application.Commands.Interfaces;
using server.Application.Features.Interfaces;
using server.Application.Features.Persons.Commands.CreatePerson;
using server.Application.Features.Persons.Commands.DeletePerson;
using server.Application.Features.Persons.Commands.RestorePerson;
using server.Application.Features.Persons.Commands.UpdatePerson;
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
using Swashbuckle.AspNetCore.Filters;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Data
builder.Services.AddSingleton<InMemoryContext>();
// User
builder.Services.AddScoped<IReadUserRepository, ReadUserRepository>();
builder.Services.AddScoped<IWriteUserRepository, WriteUserRepository>();

builder.Services.AddScoped<IHandlerBase<CreateUserCommand>, CreateUserHandler>();
builder.Services.AddScoped<IHandlerBase<LoginCommand>, LoginHandler>();
builder.Services.AddScoped<IHandlerBase<UpdatePasswordCommand>, UpdatePasswordHandler>();
builder.Services.AddScoped<IHandlerBase<UpdateUserCommand>,  UpdateUserHandler>();
builder.Services.AddScoped<IQueryHandler<GetUserProfileQuery>,  GetUserProfileHandler>();
builder.Services.AddScoped<ICreateToken, CreateToken>();

//person
builder.Services.AddScoped<IReadPerson, ReadPersonRepository>();
builder.Services.AddScoped<IWritePerson, WritePersonRepository>();
builder.Services.AddScoped<IHandlerBase<CreatePersonCommand>, CreatePersonHandler>();
builder.Services.AddScoped<IHandlerBase<DeletePersonCommand>, DeletePersonHandler>();
builder.Services.AddScoped<IHandlerBase<RestorePersonCommand>, RestorePersonHandler>();
builder.Services.AddScoped<IHandlerBase<UpdatePersonCommand>, UpdatePersonHandler>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://127.0.0.1:5500")
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials());
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["AppSettings:Issuer"],
            ValidateAudience = true,
            ValidAudience = builder.Configuration["AppSettings:Audience"],
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value!)),
            ValidateIssuerSigningKey = true
        };
    });

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => {
options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Standard Authorization header using the Bearer scheme (\"bearer {token}\")",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.UseCors("AllowSpecificOrigin");

app.MapControllers();

app.Run();
